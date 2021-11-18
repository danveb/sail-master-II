"use strict"

/** Express app for sail-master-II. */
const express = require("express")
const cors = require("cors")

const { NotFoundError } = require("./expressError")

const { authenticateJWT } = require("./middleware/auth")
const authRoutes = require("./routes/auth")
const clubsRoutes = require("./routes/clubs")
const usersRoutes = require("./routes/users")
const voyageRoutes = require("./routes/voyage")

const morgan = require("morgan")

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))
app.use(authenticateJWT)

/** Express Routes */
app.use("/auth", authRoutes)
app.use("/clubs", clubsRoutes)
app.use("/users", usersRoutes)
app.use("/voyage", voyageRoutes)

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack)
  const status = err.status || 500
  const message = err.message

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app