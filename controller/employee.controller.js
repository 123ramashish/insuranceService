import Employee from "../models/employee.model.js";

class EmployeeManager {
  async newEmployee(req, res) {
    try {
      const {
        insuranceType,
        department,
        typeOfLeave,
        startDate,
        endDate,
        carNumber,
        insuranceCompany,
        premium,
        grossPremium,
        reason,
      } = req.body;

      console.log("New employee request received");

      // Validate required fields
      if (
        !department?.trim() ||
        !typeOfLeave?.trim() ||
        !startDate ||
        !endDate
      ) {
        return res.status(400).send("All required fields must be filled");
      }

      // Fetch the latest employee to generate the next employeeId
      const employees = await Employee.find().sort({ employeeId: -1 }).limit(1);
      const lastEmployeeId =
        employees.length > 0 ? employees[0].employeeId : "E000";

      // Extract the numeric part of the lastEmployeeId and increment
      const lastIdNumber = parseInt(lastEmployeeId.substring(1), 10);
      const newIdNumber = lastIdNumber + 1;

      // Format new employeeId with leading zeros
      const employeeId = `E${newIdNumber.toString().padStart(3, "0")}`;
      console.log("Employee ID created:", employeeId);

      // Create a new employee
      const newEmployee = new Employee({
        employeeId,
        insuranceType: insuranceType || "Not found",
        department,
        typeOfLeave,
        startDate,
        endDate,
        carNumber: carNumber || "Not found",
        insuranceCompany: insuranceCompany || "Not found",
        premium: premium || 0,
        grossPremium: grossPremium || 0,
        reason: reason || "Not found",
      });

      // Save the employee to the MongoDB database
      await newEmployee.save();
      console.log("Data saved to database");

      return res.status(201).send("Employee added successfully!");
    } catch (err) {
      console.error("Error adding employee:", err);
      return res.status(500).send("Something went wrong!");
    }
  }

  async getAllEmployee(req, res) {
    try {
      // Fetch all users from the database
      const employee = await Employee.find();

      // If no users found, send a 404 response
      if (employee.length === 0) {
        return res.status(404).send("No data available");
      }

      // If users are found, send them with a 200 OK status
      return res.status(200).json(users);
    } catch (err) {
      // Send a 500 response for any server-side errors
      return res.status(500).send("Something went wrong!");
    }
  }
}

export default EmployeeManager;
