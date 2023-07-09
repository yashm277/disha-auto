const mongoose = require("mongoose");
//create schema called reviews with the employee id as a foreign key
const reviewSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    //review comments
    comments: {
        type: String,
        required: true,
    },
    //review rating -- out of 5 stars-- set appropriate min and max values
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    //done with the schema
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = { Review };
