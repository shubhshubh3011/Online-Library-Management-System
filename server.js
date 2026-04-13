const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// view engine
app.set("view engine", "ejs");

// layouts
app.use(expressLayouts);
app.set("layout", "layout");

// DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// routes
app.use("/", require("./routes/bookRoutes"));
app.use("/", require("./routes/userRoutes"));
app.use("/", require("./routes/transactionRoutes"));

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});