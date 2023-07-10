const mongoose = require("mongoose");
//create a trainings schema that has the employee id as a foreign key, the training category, and the training date
import { Employee } from "./employee.js";
import { Training } from "./training.js";

const trainingSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    //training category
    category: {
        type: String,
        enum: ["safety", "technical", "soft skills"],
        //ask yash sir about this 
        required: true,
    },
    //training date in DD/MM/YYYY format
    date: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
            return regex.test(value);
          },
          message: "Invalid date format. Please use MM/DD/YYYY.",
        },
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
    //done with the schema
});

// a virtual attribute of time till training -- calculate the difference between the training date and today's date
trainingSchema.virtual("time_till_training").get(function () {
    const today = new Date();
    const trainingDateParts = this.date.split("/");
    const trainingDate = new Date(
        trainingDateParts[2],
        trainingDateParts[0] - 1,
        trainingDateParts[1]
    );
    const diffInMilliseconds = trainingDate - today;
    const diffInDays = Math.floor(diffInMilliseconds / (24 * 60 * 60 * 1000));
    return diffInDays;
});



const Training = mongoose.model("Training", trainingSchema);

module.exports = { Training };
