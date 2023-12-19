const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = Schema({
    name: { type: String},
    photo:{type:String}
})

module.exports = mongoose.model('Student',StudentSchema)