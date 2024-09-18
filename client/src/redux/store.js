// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
