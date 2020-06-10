const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


//import model
const {User} = require('../../models/User');

//import middlewaare
const {auth} = require('../../middleware/auth');


//@route GET api/auth
//@desc Load Route
//@access Public

router.get('/', auth, async (req,res) =>{
   
    try {
     const user = await User.findById(req.user.id).select('-password');
     res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



//@route POST api/auth
//@desc auth login
//@access Public

router.post('/', [
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Password required').exists()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const { password, email} = req.body;
      try {   
        //see if user exists
        let user =  await User.findOne({email: email});
        if (!user) {
            res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
        }
        
        const isMatch = bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.status(400).json({errors: [{msg: 'Invalid Credentials '}]});
        }
        
        const  payload = {
            user : {
                id : user.id
            }
        }
        
        //return jssonwebtoken
        jwt.sign(
            payload, 
            config.get('jwtSECRET'),
            {expiresIn: 360000},
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
