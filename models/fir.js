const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const firSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    desc: {type: String, required: true},
}, {timestamps: true});

exports.Fir = mongoose.model('Fir', firSchema)