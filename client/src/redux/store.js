// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import employeeReducer from "./employee/employeeSlice.js";

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
    employee: employeeReducer,
  },
});

export default store;
