const {
  getCriminals,
  addCriminal,
  getCriminalByID,
  updateCriminalID,
  deleteCrimalByID,
} = require("../controllers/criminalControllers");
const forbiddenMethod = require("../controllers/forbiddenMethod");
const express = require("express");
const { verifyUser } = require("../authenticate");

const router = express.Router();

router
  .route("/")
  .get(getCriminals)
  .post(verifyUser, addCriminal)
  .put(forbiddenMethod)
  .delete(forbiddenMethod);

router
  .route("/:id")
  .get(verifyUser, getCriminalByID)
  .post(forbiddenMethod)
  .put(verifyUser, updateCriminalID)
  .delete(verifyUser, deleteCrimalByID);

module.exports = router;
