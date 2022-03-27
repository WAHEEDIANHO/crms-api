const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintsSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    desc: {type: String, required: true}
})

exports.Complaint = mongoose.model('Complaint', complaintsSchema);