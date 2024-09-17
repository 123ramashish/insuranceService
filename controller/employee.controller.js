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
      return res.status(200).json(employee);
    } catch (err) {
      // Send a 500 response for any server-side errors
      return res.status(500).send("Something went wrong!");
    }
  }
  async getOneEmployee(req, res) {
    try {
      // Extract employeeId from the request parameters
      const { employeeId } = req.params; // Use req.query if the ID is sent as a query parameter

      // Fetch the employee from the database using the employeeId
      const employee = await Employee.findOne({ employeeId });

      // If no employee found, send a 404 response
      if (!employee) {
        return res.status(404).send("No data available");
      }

      // If employee is found, send the employee data with a 200 OK status
      return res.status(200).json(employee);
    } catch (err) {
      // Send a 500 response for any server-side errors
      console.error("Error fetching employee:", err);
      return res.status(500).send("Something went wrong!");
    }
  }

  async sortGroupEmployee(req, res) {
    try {
      const { sortBy, order, groupBy } = req.query; // Extract query parameters

      if (sortBy) {
        // Handle sorting
        const sortOrder = order === "desc" ? -1 : 1; // Default to ascending if 'desc' is not provided
        const sortOptions = { [sortBy]: sortOrder };

        const employees = await Employee.find().sort(sortOptions);
        return res.status(200).send(employees);
      }

      if (groupBy) {
        // Handle grouping
        const groupField = groupBy; // Field to group by

        const groupedEmployees = await Employee.aggregate([
          {
            $group: {
              _id: `$${groupField}`, // Group by the specified field
              count: { $sum: 1 }, // Count the number of employees in each group
              employees: { $push: "$$ROOT" }, // Push all employee details to the group
            },
          },
        ]);

        return res.status(200).send(groupedEmployees);
      }

      return res.status(400).send("No sorting or grouping criteria provided");
    } catch (err) {
      console.error("Error processing request:", err);
      return res.status(500).send("Something went wrong!");
    }
  }

  async updateEmployee(req, res) {
    try {
      const {
        employeeId,
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

      // Validate required fields
      if (
        !employeeId ||
        !department?.trim() ||
        !typeOfLeave?.trim() ||
        !startDate ||
        !endDate
      ) {
        return res.status(400).send("All required fields must be filled");
      }

      // Update the employee record
      const updatedEmployee = await Employee.findOneAndUpdate(
        { employeeId }, // Find employee by employeeId
        {
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
        },
        { new: true } // Return the updated document
      );

      // Check if the employee was found and updated
      if (!updatedEmployee) {
        return res.status(404).send("Employee not found");
      }

      console.log("Employee updated successfully");
      return res.status(200).send("Employee updated successfully!");
    } catch (err) {
      console.error("Error updating employee:", err);
      return res.status(500).send("Something went wrong!");
    }
  }

  async deleteEmployee(req, res) {
    try {
      // Extract employeeId from request parameters
      const { employeeId } = req.params;

      // Find and delete the employee with the given employeeId
      const deletedEmployee = await Employee.findOneAndDelete({ employeeId });

      // Check if the employee was found and deleted
      if (!deletedEmployee) {
        return res.status(404).send("Employee not found");
      }

      // Send success response if deletion was successful
      return res.status(200).send("Employee deleted successfully!");
    } catch (err) {
      // Log the error and send a 500 response for server-side errors
      console.error("Error deleting employee:", err);
      return res.status(500).send("Something went wrong!");
    }
  }
}

export default EmployeeManager;
