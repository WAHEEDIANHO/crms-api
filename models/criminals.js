const mongoose = require('mongoose')
const Schema = mongoose.Schema

criminalsSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    mobile: { type: Number, required: true, min: 0 },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
     height: { type: Number, required: true, min: 0, max: 8 },
    weight: { type: Number, required: true, min: 0, },
    dob:{ type: Date, required: true }, 
    image: { type: String, required: true },
    crimes: [ { type: Schema.Types.ObjectId, ref: 'Court' } ],
    // username: {
    //     type: String,
    //     required:true, 
    //     unique: true
    // },
    // pswrd: {
    //     type: String,
    //     required: true
    // }
}, {timestamps: true})

exports.Criminal = mongoose.model('Criminal', criminalsSchema)