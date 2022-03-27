const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
// const session = require("express-session");
// const FileStore = require("session-file-store")(session);
const {
  criminalRouters,
  courtRouters,
  crimeRouter,
  userRouter,
} = require("./routes");
const passport = require("passport");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 7700;

// Middlewares
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: "45634-986yt-765-6324mhy",
//     saveUninitialized: false,
//     resave: false,
//     name: "session-id",
//     store: FileStore(),
//   })
// );
app.use(passport.initialize());
// app.use(passport.session());

const api = process.env.API_URL;

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once("connected", () => {
  console.log("conected successfully to database");
})
  .on("error", (err) => {
    console.log(err);
  })
  .once("disconnected", () => {
    console.log("database disconnected");
  });

// const auth = (req, res, next) => {
//   if (!req.user) {
//     const err = new Error("You are not authenticated");
//     err.status = 500;
//     return res.json({ success: false, err: err });
//   }
//   next();
// };
app.use(`/${api}/user`, userRouter);
app.use(`/${api}/criminal`, criminalRouters);
app.use(`/${api}/court`, courtRouters);
app.use(`/${api}/crime`, crimeRouter);

app.listen(PORT, () => console.log("app listenig o port on ", PORT));