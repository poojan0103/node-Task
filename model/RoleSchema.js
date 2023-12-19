const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = Schema({
    email: { type: String},
    role:{type:String},
    invitationCode :{type:String},
    expiryDate :{type:Date},
    isUsed:{type:Boolean,default:false}
})

module.exports = mongoose.model('Role',RoleSchema)