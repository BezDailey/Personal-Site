const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Environment variables
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Redirects HTTP to HTTPS
app.use((req, res, next) => {
  if (
    req.header("x-forwarded-proto") !== "https" &&
    process.env.NODE_ENV === "production"
  ) {
    res.redirect(`https://${req.header("host")}${req.url}`);
  } else {
    next();
  }
});

// Database Connection
/*
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
*/

// API Routes
// Example: app.use('/api/users', require('./routes/users'));

// Serve static assets if in production
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

  console.log("hi");
  console.log(process.env.NODE_ENV);

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html"),
    );
  });
}

// PORT
const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server running on port ${port}`));
