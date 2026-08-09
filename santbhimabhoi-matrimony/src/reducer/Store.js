import { configureStore } from "@reduxjs/toolkit";
import brideReducer from "../slice/BrideSlice";
import groomReducer from "../slice/GroomSlice";
import windowReducer from "../slice/WindowSlice"; // Import the widow reducer
import registrationReducer from "../slice/Registration"; // Import the registration reducer
import loginReducer from "../slice/loging"; // Import the login reducer
import testimonialReducer from "../slice/testimonialSlice"; // Import the testimonial reducer
import profileReducer from "../slice/profileSlice"; // Import the profile reducer
import interestReducer from "../slice/interestSlice"; // Import the interest reducer
export const store = configureStore({
  reducer: {
    bride: brideReducer,
    groom: groomReducer,
    window: windowReducer, // Add the window reducer here
    registration: registrationReducer, // Add the registration reducer here
    login: loginReducer,
    testimonials: testimonialReducer,
    profiles: profileReducer,
    interest: interestReducer,
  },
});