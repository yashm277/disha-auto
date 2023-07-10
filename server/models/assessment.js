const mongoose = require("mongoose");
//create schema called assessment with the training id as a foreign key and similar attributes as the training schema
import { Training } from "./training.js";
const assessmentSchema = new mongoose.Schema({
    training_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Training",
        required: true,
    },
    //assessment category
    category: {
        type: String,
        enum: ["safety", "technical", "soft skills"],
        //ask yash sir about this
        required: true,
    },
    //assessment date in DD/MM/YYYY format
    date: {
        type: Date,
        required: true,
    },
    //supporting document
    document: {
        type: String,
        required: false,
    },
    //completed or not
    completed: {
        type: Boolean,
        required: true,
    },
    //score of the assessment - total score and score obtained
    total_score: {
        type: Number,
        required: true,
    },
    score_obtained: {
        type: Number,
        required: true,
    },
    //done with the schema
});

//create a virtual attribute called score_percentage
assessmentSchema.virtual("score_percentage").get(function () {
    return (this.score_obtained / this.total_score) * 100;
});
//create another virtual attribute called status-- if score_percentage is greater than 90 then status is excellent, >80 then good, >70 then average, else needs retraining
assessmentSchema.virtual("status").get(function () {
    if (this.score_percentage > 90) {
        return "Excellent";
    } else if (this.score_percentage > 80) {
        return "Good";
    } else if (this.score_percentage > 70) {
        return "Average";
    } else {
        return "Needs Retraining";
    }
});

//create the model
const Assessment = mongoose.model("Assessment", assessmentSchema);

module.exports = { Assessment };
