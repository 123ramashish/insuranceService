//importing necessary package
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import employeeRouter from "./routes/employee.router.js";

// import to resolve client folder file path
// import path from "path";
// import { fileURLToPath } from "url";
import { CustomError } from "./middleware/custom.error.js";

//accessing env data config
dotenv.config();
// accessing client folder path
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "/client/dist")));
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/client/dist/index.html"))
// );
app.use("/api/employee", employeeRouter);
// custom error handling
app.use((req, res, next) => {
  next(new CustomError("API route not found", 404));
});
// global error handling
app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({ error: err.message });
  }
  console.error(err);
  return res.status(500).send("Something is wrong!");
});

//connecting to DB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database conntected!");
  })
  .catch((err) => {
    console.log("Error to connect database:", err.message);
  });

//Listing to port

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
