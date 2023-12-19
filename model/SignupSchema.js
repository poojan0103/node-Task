const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SignupSchema =  Schema({

    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    is_verified :{
        type: Boolean,
        default:false
    },
    photo:{
        type:String
    },
    Invitecode:{
        type:String
    },
    role:{
        type:String,
    }
   
})

module.exports = mongoose.model('Signup', SignupSchema)
