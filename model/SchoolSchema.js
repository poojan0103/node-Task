const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolSchema = Schema({
    name: { type: String},
    photo:{type:String},
    user:{
        type:Schema.Types.ObjectId,
        ref:'Signup'
    }
})

module.exports = mongoose.model('School',SchoolSchema)