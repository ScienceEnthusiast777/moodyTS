require("dotenv/config");

require("./db");

const express = require("express");
const path = require("path");
const app = express();

require("./config")(app);

// const allRoutes = require("./routes/index");
// app.use("/api", allRoutes);

const auth = require("./routes/auth");
app.use("/api/auth", auth);

const moody = require("./routes/moody");
app.use("/api/moody", moody);

require("./error-handling")(app);

app.use((req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

module.exports = app;
