const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require('cors');


/**
 * ========== GENERAL SETUP ==============
 */

dotenv.config({ path: "./config/config.env" });

const connectDB = require("./config/db");
connectDB();

const app = express();

/**
 * ========== CORS SETUP ==========
 */

const origin = process.env.ORIGIN || "http://localhost:3000";

app.use(cors({ origin, credentials: true }));

// /**
//  * ========== SESSION SETUP ==========
//  */

// const session = require("./config/session");
// app.use(session);

// /**
//  * ========== PASSPORT AUTHENTICATION ==========
//  */

// app.use(passport.initialize());
// app.use(passport.session());

// require("./config/passport");

/**
 * ========== ROUTES ==============
 */

const catalogRouter = require("./routes/catalog");
const usersRouter = require("./routes/user");
const authRouter = require("./routes/auth");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //Body parser
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/user", usersRouter);
app.use("/", catalogRouter);

/**
 * ========== ERROR HANDLER ==============
 */

if (process.env.NODE_ENV === "develop") {
  app.use(logger("dev"));
}

app.use(function (req, res, next) {
  let error = new Error("Page not found");
  error.statusCode = 404;
  next(error);
});

const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);

/**
 * ========== SERVER ==============
 */

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(
    `Express started on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  );
});