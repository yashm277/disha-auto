// Import necessary modules and dependencies
import mongoose from "mongoose";

// Define the schema for the Employee table -- mention requried fields
const employeeSchema = new mongoose.Schema({
  // date_of_birth: Date,
  date_of_birth: {
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
  first_name: String,
  last_name: String,
  contact: String,
  emergency_contact: String,
  //have set designations enum for all the employees -- its a manu firm, have like manager, supervisor, etc
  designation: {
    type: String,
    enum: [
      "manager",
      "supervisor",
      "worker",
      "hr",
      "accountant",
      "admin",
      "security",
    ],
    required: true,
  },
  //have set departments enum for all the employees -- its a manu firm, have like CNC, painting, quality, hr,  etc
  department: {
    type: String,
    enum: [
      "cnc",
      "painting",
      "quality",
      "hr",
      "accounting",
      "admin",
      "security",
    ],
    required: true,
  },
});

employeeSchema.virtual("age").get(function () {
  const currentDate = new Date();
  const parts = this.date_of_birth.split("/");
  const birthDate = new Date(parts[2], parts[0] - 1, parts[1]);
  const ageInMilliseconds = currentDate - birthDate;
  const ageInYears = Math.floor(
    ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)
  );
  return ageInYears;
});

// Create the Employee model using the schema
const Employee = mongoose.model("Employee", employeeSchema);

// Export the Employee model
export { Employee };
