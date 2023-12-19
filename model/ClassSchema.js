const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = Schema({
    name:{
        type: String,
    },
    student:[{
        type: Schema.Types.ObjectId,
        ref:'Student',
        default:[]
    }]
})
module.exports = mongoose.model('Class',ClassSchema)