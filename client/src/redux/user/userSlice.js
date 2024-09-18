// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  user: null,
};

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set the user data after successful sign-in
    signInSuccess: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

// Export actions
export const { signInSuccess } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
