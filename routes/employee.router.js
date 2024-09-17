import express from "express";
import EmployeeManager from "../controller/employee.controller.js";
const employeeManager = new EmployeeManager();
const router = express.Router();
router.get("/test", (req, res) => res.send("API is working!"));
router.get("/", employeeManager.getAllEmployee);
router.post("/", employeeManager.newEmployee);

export default router;
