const mongoose =  require( 'mongoose');

const userSchema = new mongoose.Schema({     
    name:{
       type: String,
       required: true         
    },
    lastname:{
       type: String,     
    },
    email:{
       type: String,
       required: true,
       unique:true         
    },
    password:{
       type: String,
       required: true,
       minlength: 6        
    },
        
    avatar:{
       type: Number, 
       default: 0
    },
    token:{
       type: String
    },
    Date:{
       type: Date,
       default: Date.now
    }
});


const User = mongoose.model('User', userSchema );

module.exports = {User};