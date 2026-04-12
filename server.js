const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/", require("./routes/userRoutes"));

// DB connect
mongoose.connect("mongodb+srv://shubhom2004_db_user:<password>@cluster0.burb1ya.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// routes
app.use("/", require("./routes/bookRoutes"));
app.use("/", require("./routes/transactionRoutes"));

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});