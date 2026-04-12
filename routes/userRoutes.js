const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register Page
router.get("/register", (req, res) => {
    res.send(`
        <h2>Register</h2>
        <form method="POST">
            <input name="name" placeholder="Name" required/>
            <input name="email" placeholder="Email" required/>
            <input name="password" type="password" placeholder="Password" required/>
            <button>Register</button>
        </form>
    `);
});

// Register User
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    await User.create({ name, email, password });
    res.redirect("/login");
});

// Login Page
router.get("/login", (req, res) => {
    res.send(`
        <h2>Login</h2>
        <form method="POST">
            <input name="email" placeholder="Email" required/>
            <input name="password" type="password" placeholder="Password" required/>
            <button>Login</button>
        </form>
    `);
});

// Login User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
        res.send("Login Successful");
    } else {
        res.send("Invalid Credentials");
    }
});

module.exports = router;