const {getCourts, addCourt, getCourtByID, updateCourtID} = require('../controllers/courtController')
const forbiddenMethod = require('../controllers/forbiddenMethod')
const express = require('express');

const router = express.Router();

router.route('/')
.get(getCourts)
.post(addCourt)
.put(forbiddenMethod)
.delete(forbiddenMethod);

router.route('/:id')
.get(getCourtByID)
.post(forbiddenMethod)
.put(updateCourtID)
// .delete(deleteCourtByID)


module.exports = router;