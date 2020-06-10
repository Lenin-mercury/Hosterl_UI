const express = require('express');
const router = express.Router();
const {check , validationResult} = require('express-validator');

//import model
const {Profile} = require('../../models/Profile');
const {User} = require('../../models/User');
const {auth} = require('../../middleware/auth');


//@route GET api/profile
//@desc GET ALL PROFILE
//@access Private

router.get('/',  async (req,res) => {
    
  try {
      const profiles = await Profile.find().populate('user', ['name', 'email']);
      res.json(profiles);
  } catch (e) {
    console.error(e.message);
        res.status(500).send('Server Error');
  }
    
});

//@route GET api/profile/user/:user_id
//@desc get profile by id
//@access Private

router.get('/user/:user_id',auth, async (req,res) => {
    
  try {
      const profile = await Profile.findById(req.params.user_id).populate('user', ['name', 'email']);
      if(!profile){
        return res.status(400).json({msg:"Profile not found"})
        }
      res.json(profile);
  } catch (e) {
    console.error(e.message);
    if(e.kind === 'ObjectId'){
        return res.status(400).json({msg:"Profile not found"})
    }
        res.status(500).send('Server Error');
  }
});

//@route DELETE api/profile
//@desc Delete Profile & USER Route
//@access Public

router.delete('/',auth, async (req,res) => {
    
  try { 
    //remove Profile
    await Profile.findOneAndRemove({user: req.user.id});
    
    //remove user
    await User.findOneAndRemove({_id: req.user.id });
    
    res.json({msg:'User Deleted'});
      
  } catch (e) {
    console.error(e.message);
    if(e.kind === 'ObjectId'){
        return res.status(400).json({msg:"Profile not found"})
    }
        res.status(500).send('Server Error');
  }
});


//@route GET api/profile/me
//@desc Get our profile Route
//@access Public

router.get('/me', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({user:req.user.id}).populate(
            'User', ['name', 'email'])
        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'});
        }
        
        res.json(profile);
        
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});


//@route post api/profile
//@desc to create and update profiles
//@access Private

router.post('/',auth,   [
    check('mobile', 'mobile is required').not().isEmpty(), 
    check('status', 'status is required').not().isEmpty()
    ], 
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        
        const {
        status,
        birthday,
        gender,
        permanent_address,
        city,
        mobile,
        state,
        country,
        fathersname,
        companysname,
        hobbies,
        dateofjoining,
        companysaddress,
        companycity,
        companystate,
        officepincode
        } = req.body;
        
        //build profile Objects
        
        const profileFields = {};
        
        profileFields.user = req.user.id;
        if(status) profileFields.status = status;
        if(birthday) profileFields.birthday = birthday;
        if(gender) profileFields.gender = gender;
        if(mobile) profileFields.mobile = mobile;
        if(permanent_address) profileFields.permanent_address = permanent_address;
        if(city) profileFields.city = city;
        if(state) profileFields.state = state;
        if(country) profileFields.country = country;
        if(fathersname) profileFields.fathersname = fathersname;
        if(companysname) profileFields.companysname = companysname;
        if(dateofjoining) profileFields.dateofjoining = dateofjoining;
        if(hobbies) {
            profileFields.hobbies = hobbies.split(',').map(hobby => hobby.trim());
            }    
        // build officaladdress Object
        profileFields.officaladdress = {};
        if(companysaddress) profileFields.officaladdress.companysaddress = companysaddress;
        if(companycity) profileFields.officaladdress.companycity = companycity;
        if(companystate) profileFields.officaladdress.companystate = companystate ;
        if(officepincode) profileFields.officaladdress.officepincode = officepincode;
        
       try {
           let profile = await Profile.findOne({user: req.user.id});
           
           if(profile) {
               //Update  
               profile = await Profile.findOneAndUpdate(
                   {user: req.user.id},
                   {$set: profileFields},
                   {new: true}
               );
               return res.json(profile);
           }
           //create 
           profile = new Profile(profileFields);
           await profile.save();
           res.json(profile);
           
       } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
       }
}); 

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true))
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route DELETE api/profile/education/:edu_id
//@desc delete education in  Profile 
//@access Private

router.delete('/education/:edu_id',auth, async (req,res) => {
  try {
      const profile = await Profile.findOne({user: req.user.id});
     //get remove index
        
        const removeIndex = profile.education
        .map(item =>item.id)
        .indexOf(req.params.edu_id);
        
        profile.education.splice(removeIndex, 1);
     
      await profile.save();
      res.json(profile);
      
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;