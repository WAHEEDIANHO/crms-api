const express = require('express');
const {addCrime, deleteCrimeByID, getCrime, getCrimeByID, updateCrimeByID} = require('../controllers/crimeControllers');
const forbiddenMethod = require('../controllers/forbiddenMethod')
const router = express.Router();

router.route('/')
.get(getCrime)
.post(addCrime)
.put(forbiddenMethod)
.delete(forbiddenMethod)

router.route('/:id')
.get(getCrimeByID)
.post(forbiddenMethod)
.put(updateCrimeByID)
.delete(deleteCrimeByID)

module.exports = router