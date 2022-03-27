const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crimeSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    desc: {type: String, required: true},
    place: {type: String}
}, {timestamps:true});

exports.Crime = mongoose.model('Crime', crimeSchema);