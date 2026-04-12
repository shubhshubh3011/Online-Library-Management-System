const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Home
router.get("/", (req, res) => {
    res.render("index");
});

// Show books
router.get("/books", async (req, res) => {
    const books = await Book.find();
    res.render("books", { books });
});

// Add book (simple)
router.post("/add-book", async (req, res) => {
    const { title, author, quantity } = req.body;

    await Book.create({ title, author, quantity });
    res.redirect("/books");
});

module.exports = router;