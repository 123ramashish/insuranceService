import express from "express";
import EmployeeManager from "../controller/employee.controller.js";
const employeeManager = new EmployeeManager();
const router = express.Router();
router.get("/test", (req, res) => res.send("API is working!"));
router.get("/", employeeManager.getAllEmployee);
router.get("/:employeeId", employeeManager.getOneEmployee);
router.get("/sortorgroup", employeeManager.sortGroupEmployee);
router.post("/", employeeManager.newEmployee);
router.post("/update", employeeManager.updateEmployee);
router.post("/delete:employeeId", employeeManager.deleteEmployee);

export default router;
