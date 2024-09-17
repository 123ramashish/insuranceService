import User from "../models/user.model.js";

class userManager {
  async newUser(req, res) {
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
      if (
        !department?.trim() ||
        !typeOfLeave?.trim() ||
        !startDate ||
        !endDate
      ) {
        return res.status(400).send("All required fields must be filled");
      }

      // Fetch all users to generate employeeId
      const users = await User.find().sort({ employeeId: -1 }).limit(1);
      const lastEmployeeId = users.length > 0 ? users[0].employeeId : "E000";

      // Extract the numeric part of the lastEmployeeId and increment
      const lastIdNumber = parseInt(lastEmployeeId.substring(1), 10);
      const newIdNumber = lastIdNumber + 1;

      // Format new employeeId with leading zeros
      const employeeId = `E${newIdNumber.toString().padStart(3, "0")}`;

      // Create a new user
      const newUser = new User({
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

      // Save the user to the MongoDB database
      await newUser.save();
      return res.status(201).send("Employee added successfully!");
    } catch (err) {
      console.error("Error adding new user:", err);
      return res.status(500).send("Something went wrong!");
    }
  }

  async getAllUser(req, res) {
    try {
      // Fetch all users from the database
      const users = await User.find();

      // If no users found, send a 404 response
      if (users.length === 0) {
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
