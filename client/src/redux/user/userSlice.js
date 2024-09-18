// userSlice.js
import { createSlice, current } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  currentUser: null,
};
// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set the user data after successful sign-in
    signInSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      console.log(state.currentUser.admin);
    },
  },
});

// Export actions
export const { signInSuccess } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
