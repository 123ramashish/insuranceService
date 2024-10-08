import express from "express";
import EmployeeManager from "../controller/employee.controller.js";
const employeeManager = new EmployeeManager();
const router = express.Router();
router.get("/test", (req, res) => res.send("API is working!"));
router.get("/", employeeManager.getAllEmployee);

router.get("/:id", employeeManager.getOneEmployee);
router.get("/sortorgroup", employeeManager.sortGroupEmployee);
router.post("/", employeeManager.newEmployee);
router.patch("/update", employeeManager.updateEmployee);
router.delete("/delete/:id", employeeManager.deleteEmployee);
router.post("/duplicate/:id", employeeManager.duplicateEmployee);
router.post("/search", employeeManager.searchEmployee);

export default router;
