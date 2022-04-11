const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
// const session = require("express-session");
// const FileStore = require("session-file-store")(session);
const { criminalRouters, userRouter } = require("./routes");
const passport = require("passport");

require("dotenv").config();
const api = process.env.API_URL;

const app = express();
const PORT = process.env.PORT || 7700;

// Middlewares
app.use(cors());
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`/${api}/uploads`, express.static(`${__dirname}/uploads`));
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

app.use(`/${api}/user`, userRouter);
app.use(`/${api}/criminal`, criminalRouters);
app.listen(PORT, () => console.log("app listenig o port on ", PORT));
