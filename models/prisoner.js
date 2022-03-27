const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prisonerSchema = new Schema({
    crime: {type: Schema.Types.ObjectId, ref: 'Crime', required: true},
    name : { type: String, required: true},
    mobile: {type: Number, required:true},
    email: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    // username: {type: String, required: true},
    // pswrd: {type: String, required: true}
});

exports.Prisoners = mongoose.model('Prisoner', prisonerSchema)