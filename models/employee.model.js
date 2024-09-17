import mongoose from "mongoose";
import moment from "moment"; // You can use moment.js for date formatting

// Function to return today's date formatted as dd-MM-yyyy
const todayDate = () => moment().format("DD-MM-YYYY");

// Define the User schema
const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    insuranceType: {
      type: String,
    },
    department: {
      type: String,
      required: true,
    },
    typeOfLeave: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
      default: todayDate,
    },
    endDate: {
      type: String,
      required: true,
    },
    carNumber: {
      type: String,
    },
    insuranceCompany: {
      type: String,
    },
    premium: {
      type: Number,
    },
    grossPremium: {
      type: Number,
    },
    reason: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create a model based on the schema
const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
