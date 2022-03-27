const {getCriminals, addCriminal, getCriminalByID, updateCriminalID, deleteCrimalByID, getCriminalCrime} = require('../controllers/criminalControllers')
const forbiddenMethod = require('../controllers/forbiddenMethod')
const express = require('express');

const router = express.Router();

router.route('/')
.get(getCriminals)
.post(addCriminal)
.put(forbiddenMethod)
.delete(forbiddenMethod);

router.route('/:id')
.get(getCriminalByID)
.post(forbiddenMethod)
.put(updateCriminalID)
.delete(deleteCrimalByID)

// criminal crime
router.route('/:id/crime')
.get(getCriminalCrime)
// .post(addCriminalCrime)
// .put(forbiddenMethod)
// .delete(deleteCrimalCrime)

// router.route('/:id/crime/"id')
// .get(getCriminalByID)
// .post(forbiddenMethod)
// .put(updateCriminalID)
// .delete(deleteCrimalByID)



module.exports = router;