const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chargeSchema = new Schema({
    fine: {type: Number, required: true, },
    type: {type: String, required: true},
    desc: {type: String, required: true},
});

exports.Charge = mongoose.model('Charge', chargeSchema);