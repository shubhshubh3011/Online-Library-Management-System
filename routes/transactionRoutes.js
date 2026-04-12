const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Transaction = require("../models/Transaction");

// Borrow
router.get("/borrow/:id", async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book.quantity > 0) {
        book.quantity -= 1;
        await book.save();

        await Transaction.create({
            bookId: book._id,
            borrowDate: new Date(),
            returned: false
        });
    }

    res.redirect("/books");
});

// Return
router.get("/return/:id", async (req, res) => {
    const txn = await Transaction.findById(req.params.id);

    if (!txn.returned) {
        txn.returned = true;
        txn.returnDate = new Date();
        await txn.save();

        const book = await Book.findById(txn.bookId);
        book.quantity += 1;
        await book.save();
    }

    res.redirect("/mybooks");
});

// My Books
router.get("/mybooks", async (req, res) => {
    const transactions = await Transaction.find({ returned: false });
    res.render("mybooks", { transactions });
});

module.exports = router;