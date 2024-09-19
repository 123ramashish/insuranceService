import { createSlice, current } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  currentEmployee: null,
  id: null,
};

// Create the employee slice
const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    // Action to set the employee data
    getEmployeeSuccess: (state, action) => {
      state.currentEmployee = action.payload;
      console.log(current(state).currentEmployee); // Use current(state) to safely log the state
    },
    // Action to set the employee ID
    getEmployeeId: (state, action) => {
      state.id = action.payload;
      console.log(current(state).id);
    },
  },
});

// Export actions
export const { getEmployeeSuccess, getEmployeeId } = employeeSlice.actions;

// Export the reducer
export default employeeSlice.reducer;
