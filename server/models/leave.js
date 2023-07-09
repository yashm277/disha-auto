import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  type: {
    type: String,
    enum: ["annual", "sick", "maternity", "paternity", "unpaid"],
    required: true,
  },
  start_date: {
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
  end_date: {
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
  document: {
    type: String,
    required: false,
  },
});

// Derived attribute 'length_of_leave' to calculate the difference between start_date and end_date
leaveSchema.virtual("length_of_leave").get(function () {
  const startDateParts = this.start_date.split("/");
  const endDateParts = this.end_date.split("/");
  const startDate = new Date(
    startDateParts[2],
    startDateParts[0] - 1,
    startDateParts[1]
  );
  const endDate = new Date(endDateParts[2], endDateParts[0] - 1, endDateParts[1]);
  const diffInMilliseconds = endDate - startDate;
  const diffInDays = Math.floor(diffInMilliseconds / (24 * 60 * 60 * 1000));
  return diffInDays;
});

const Leave = mongoose.model("Leave", leaveSchema);

export { Leave };
