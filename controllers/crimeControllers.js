const {Crime} = require('../models/crime');
const { error } = require('./error');

const getCrime = async (req, res) => {          //Listing f all crimes 
    try {
            const crimes = await Crime.find({});
            if(crimes.length != 0) res.status(200).json({success: true, data: crimes}) 
            else error("no crime yet")
    } catch ({message}) {
        res.status(404).json({success: false, message})
    } 
}

const addCrime = async (req, res) => {  // Adding new crime
    console.log(req.body);
    const props = Object.keys(Crime.schema.obj);
    try {
        if(props.length === Object.keys(req.body).length) {
            const crime = await Crime.create(req.body);
            res.status(200).json({sucess: true, data: crime});
        }else{
           const empty = props.filter(prop => !req.body.hasOwnProperty(prop));
           error(empty);
        }
    } catch ({message}) {
        res.status(500).json({success: false, message});
    }
}

const getCrimeByID = async (req, res) => {
    const {id} = req.params;
    try {
        const crime = await Crime.findById(id);
        if(!crime) error(`no crime with ${id}`);
        res.status(200).json({success: true, data: crime});
    } catch ({message}) {
        res.status(404).json({sucess: false, message});
    }
}

const updateCrimeByID = async (req, res) => {
    const {id} = req.params
    console.log(id)
    try {
            const update_crime = await Crime.findByIdAndUpdate(id, req.body)
            if(!update_crime) {
                const err = new Error()
                err.message ="No crime updated"
                throw err
            }
            res.status(200).json({sucess: true, data: id})
    } catch ({message}) {
            res.status(500).json({success: false, message})
    }
}

const deleteCrimeByID = async (req, res) => {
    const {id} = req.params
    console.log(id)
   try {
        const delete_crime = await Crime.findByIdAndDelete(id)
        if(!delete_crime)  error()
        res.status(200).json({sucess: true, data: id})
   } catch ({message}) {
        res.status(500).json({success: false, message})
   }
}
module.exports = {
    getCrime,
    addCrime,
    getCrimeByID,
    updateCrimeByID,
    deleteCrimeByID
}