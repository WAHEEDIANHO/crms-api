const {Court} = require('../models/court')

const getCourts = async (req, res) => {
    try {
        const courts = await Court.find({})
        if(courts.length != 0) res.status(200).json({success: true, data: courts});
        else res.status(404).json({success: false, msg: "no court"})
    } catch (error) {
        res.status(500).json({success: false, msg: err})
    }
}

const addCourt = async (req, res) => {
    const props = Object.keys(Court.schema.obj);
    if(props.length === Object.keys(req.body).length) {
        const court = await Court.create(req.body)
        res.status(200).json({sucess: true, data: court});
    }else{
       const empty = props.filter(prop => !req.body.hasOwnProperty(prop))
        res.status(400).json({success: false, msg: empty})
    }
}

const getCourtByID = async (req, res) => {
    const {id} = req.params;
    console.log(id)
    const court = await Court.findById(id)
    if(court) res.status(200).json({sucess: true, data: court})
    else res.status(400).json({sucess: false, msg: "no entry match criminal ID"})
}

const updateCourtID = async (req, res) => {
    const {id} = req.params
    console.log(id)
   const update_court = await Court.findByIdAndUpdate(id, req.body)
   if(!update_court) return res.status(400).json({success: false, msg: "no entry to update"})
   res.status(200).json({sucess: true, data: id})
}

module.exports = {
    getCourts,
    addCourt,
    getCourtByID, 
    updateCourtID
}