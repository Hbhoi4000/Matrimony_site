import { configureStore } from "@reduxjs/toolkit";
import brideReducer from "../slice/BrideSlice";
import groomReducer from "../slice/GroomSlice";
import windowReducer from "../slice/WindowSlice"; // Import the widow reducer
import registrationReducer from "../slice/Registration"; // Import the registration reducer
export const store = configureStore({
  reducer: {
    bride: brideReducer,
    groom: groomReducer,
    window: windowReducer, // Add the window reducer here
    registration: registrationReducer, // Add the registration reducer here
  },
});