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

      // Validate required fields
      if (!department || !typeOfLeave || !startDate || !endDate) {
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

      // Create a new employee
      const newEmployee = new Employee({
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
      });

      // Save the employee to the MongoDB database
      await newEmployee.save();

      return res.status(201).send("Employee added successfully!");
    } catch (err) {
      console.error("Error adding employee:", err);
      return res.status(500).send("Something went wrong!");
    }
  }

  async getAllEmployee(req, res) {
    try {
      // Fetch all employees from the database
      const employees = await Employee.find();
      // If no employees found, send a 404 response
      if (employees.length === 0) {
        return res.status(404).json({ message: "No data available" });
      }

      // If employees are found, send them with a 200 OK status
      return res.status(200).send(employees);
    } catch (err) {
      // Log the error for debugging purposes
      console.error(err);

      // Send a 500 response for any server-side errors
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }

  async getOneEmployee(req, res) {
    try {
      // Extract employeeId from the request parameters
      const { employeeId } = new Object(req.params);
      console.log("getoneemployee", employeeId, typeof employeeId);
      // Fetch the employee from the database using the employeeId
      const employee = await Employee.findOne({ _id: employeeId });

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
      const { id } = new Object(req.params);

      // Find and delete the employee with the given employeeId
      const deletedEmployee = await Employee.findOneAndDelete({ _id: id });

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

  async duplicateEmployee(req, res) {
    try {
      // Extract employee ID from request parameters
      const { id } = req.params;

      // Check if the ID is a valid MongoDB ObjectId
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid employee ID" });
      }

      // Find the existing employee by ID
      const existingEmployee = await Employee.findById(id);

      // If the employee is not found, send a 404 response
      if (!existingEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Convert the existing employee document to a plain object
      const employeeData = existingEmployee.toObject();
      delete employeeData._id;

      // Create a new Employee instance with the copied data
      const newEmployee = new Employee(employeeData);

      // Save the new (duplicated) employee to the database
      await newEmployee.save();

      // Send a success response
      return res
        .status(201)
        .json({ message: "Employee duplicated successfully!", newEmployee });
    } catch (err) {
      // Log the error and send a 500 response for server-side errors
      console.error("Error duplicating employee:", err);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }

  async searchEmployee(req, res) {
    try {
      const { type, data } = req.body;

      // Initialize the query object
      let query = {};

      // Check if type and data are arrays
      if (
        Array.isArray(type) &&
        Array.isArray(data) &&
        type.length === data.length
      ) {
        // Process as arrays
        for (let i = 0; i < type.length; i++) {
          const field = type[i];
          const criteria = data[i];

          if (!criteria) continue;

          // Handle different types of conditions
          if (criteria.is) {
            query[field] = { $in: criteria.is };
          }
          if (criteria.isNot) {
            query[field] = { $nin: criteria.isNot };
          }
          if (criteria.isEmpty) {
            query[field] = { $exists: true, $eq: "" };
          }
          if (criteria.isNotEmpty) {
            query[field] = { $exists: true, $ne: "" };
          }
          if (criteria.startWith) {
            query[field] = {
              $regex: `^${criteria.startWith.join("|")}`,
              $options: "i",
            };
          }
          if (criteria.endWith) {
            query[field] = {
              $regex: `${criteria.endWith.join("|")}$`,
              $options: "i",
            };
          }
          if (criteria.like) {
            query[field] = { $regex: criteria.like.join("|"), $options: "i" };
          }
          if (criteria.contains) {
            query[field] = {
              $regex: criteria.contains.join("|"),
              $options: "i",
            };
          }
          if (criteria.notContains) {
            query[field] = {
              $not: { $regex: criteria.notContains.join("|"), $options: "i" },
            };
          }
        }
      } else {
        // Process as single values
        if (type && data) {
          const field = type;
          const criteria = data;

          if (criteria.is) {
            query[field] = { $in: criteria.is };
          }
          if (criteria.isNot) {
            query[field] = { $nin: criteria.isNot };
          }
          if (criteria.isEmpty) {
            query[field] = { $exists: true, $eq: "" };
          }
          if (criteria.isNotEmpty) {
            query[field] = { $exists: true, $ne: "" };
          }
          if (criteria.startWith) {
            query[field] = { $regex: `^${criteria.startWith}`, $options: "i" };
          }
          if (criteria.endWith) {
            query[field] = { $regex: `${criteria.endWith}$`, $options: "i" };
          }
          if (criteria.like) {
            query[field] = { $regex: criteria.like, $options: "i" };
          }
          if (criteria.contains) {
            query[field] = { $regex: criteria.contains, $options: "i" };
          }
          if (criteria.notContains) {
            query[field] = {
              $not: { $regex: criteria.notContains, $options: "i" },
            };
          }
        } else {
          return res.status(400).send("Invalid search criteria");
        }
      }

      // Fetch employees based on the constructed query
      const employees = await Employee.find(query);

      // If no employees are found, send a 404 response
      if (employees.length === 0) {
        return res.status(404).send("No employees found");
      }

      // Send the employees with a 200 OK status
      return res.status(200).json(employees);
    } catch (err) {
      // Log the error and send a 500 response for server-side errors
      console.error("Error searching for employees:", err);
      return res.status(500).send("Something went wrong!");
    }
  }
}

export default EmployeeManager;
