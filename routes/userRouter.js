const express = require("express");
const User = require("../models/user");
const forbiddenMethod = require("../controllers/forbiddenMethod");
const {
  addUser,
  deleteUserByID,
  getUserByID,
  getUsers,
  updateUserByID,
} = require("../controllers/userController");
const passport = require("passport");
const authenticate = require("../authenticate");

const router = express.Router();

router.route("/").get(getUsers);
// .post(addUser)
// .put(forbiddenMethod)
// .delete(forbiddenMethod);

router
  .route("/:id")
  .get(getUserByID)
  // .post(forbiddenMethod)
  // .put(updateUserByID)
  .delete(deleteUserByID);

router.post("/signup", (req, res) => {
  User.register(new User({ ...req.body }), req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-type", "application/json");
      res.json({ err: err });
    } else {
      passport.authenticate("local")(req, res, () => {
        console.log("from here");
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.json({ success: true, status: "reg successful" });
      });
    }
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  const token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-type", "application/json");
  res.json({
    success: true,
    token: token,
    _id: req.user._id,
    status: "You are successfully loged in",
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("session-id");
  res.send("Logout successsfully");
});
module.exports = router;
