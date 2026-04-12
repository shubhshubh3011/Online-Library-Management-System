const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userId: String,
    bookId: String,
    borrowDate: Date,
    returnDate: Date,
    returned: Boolean
});

module.exports = mongoose.model("Transaction", transactionSchema);