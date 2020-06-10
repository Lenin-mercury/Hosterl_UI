const mongoose =  require( 'mongoose');

const profileSchema = new mongoose.Schema({    
                                            
    user:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'User'
        },
    birthday: {
        type: Date
        }, 
    mobile: {
        type: Number
        }, 
    status:
     { 
      type: String 
      },
    permanent_address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    country:{
        type:String
    },
    fathersname:{
        type:String
    },
    
    dateofjoining:{
        type: Date
    },
    companysname:{
        type:String
    },
    hobbies:{
        type:[String]
    },
    officaladdress:[
        {
            companysaddress:{
                type:String
            },
            companycity:{
                type:String,
            },
            companystate:{
                type:String,
            },
            officepincode:{
                type:Number,
            },
        }
    ],
    
    education:[
        {
            school:{
                type:String
            },
            
            degree:{
                type:String
            },
            fieldofstudy:{
                type:String
            },
            description:{
                type:String
            },
            current:{
                type:String
            },   
            from: {
                type: Date,
              },
              to: {
                type: Date
              }
        }
    ],
    Date:{
        type: Date,
        default: Date.now
     }
});


const Profile = mongoose.model('Profile', profileSchema );

module.exports = {Profile};
