const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cors = require('cors');

const app = express();







//UPDATES CHECK WATCH
const httpServer = require("http").createServer(app);
const io = require('./io')
io.attach(httpServer, { origins: '*:*'});


require("dotenv").config();
require("./config/database");


app.use(cors());


// Middleware to verify token and assign user object of payload to req.user
app.use(require("./config/auth"));

// The default express max request limit is 100kb, increase it
const maxRequestBodySize = "1mb";
app.use(express.json({ limit: maxRequestBodySize }));
app.use(logger("dev"));
// No forms being submitted = no need for express.urlencoded middleware!


//////FOR PRO
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));


// USERS ROUTE
app.use("/api/users", require("./routes/users"));
app.use("/api/units", require("./routes/units"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/floorplan", require("./routes/floorplan"));
app.use("/api/screens", require("./routes/screens"));
app.use("/api/themes", require("./routes/themes"));

// FOR PRO
// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// FOR PRO
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});



const port = process.env.PORT || 5000;

httpServer.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});



