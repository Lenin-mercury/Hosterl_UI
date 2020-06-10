const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//import model
const {User} = require('../../models/User');

//import middlewaare
let {auth} = require('../../middleware/auth');


//@route GET api/users
//@desc Test Route
//@access Public

router.get('/', (req,res) => res.send('User Route'));

//@route post api/users
//@desc Register user
//@access Public

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Please enter a password with minimum of 6 characters').isLength({min: 6})
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    const { name, password, email} = req.body;
       
    
      try {   
        //see if user exists
        let user =  await User.findOne({email: email});
        if (user) {
            res.status(400).json({errors: [{msg: 'User already exists'}]});
        }
        //get users gravtor 
        
        //Encrypt password
        user = new User ({
            name, 
            email,
            password
        });
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        await user.save();
        
        const  payload = {
            user : {
                id : user.id
            }
        }
        
        //return jssonwebtoken
        jwt.sign(
            payload, 
            config.get('jwtSECRET'),
            {expiresIn: 36000},
            (err, token) => {
                if (err) throw err;
                res.json({token});
            }
        );
      } catch (e) {
          console.error(e.message);
          res.status(500).send('Server Error');
      }
});


module.exports = router;