import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../config";

// 1. Async Thunk to fetch testimonials
export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials`);
      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 2. Async Thunk to add a new testimonial/comment
export const addTestimonial = createAsyncThunk(
  "testimonials/addTestimonial",
  async (newComment, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error("Failed to add testimonial");
      }
      const data = await response.json();
      return data; // Returns the newly added testimonial from backend
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 3. Testimonial Slice
const testimonialSlice = createSlice({
  name: "testimonials",
  initialState: {
    items: [],
    loading: false,
    error: null,
    submitting: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- Fetch Testimonials Reducers ---
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Add Testimonial Reducers ---
      .addCase(addTestimonial.pending, (state) => {
        state.submitting = true;
      })
      .addCase(addTestimonial.fulfilled, (state, action) => {
        state.submitting = false;
        // Option 1: Immediately append to state if backend returns the new object
        if (action.payload) {
          state.items.unshift(action.payload);
        }
      })
      .addCase(addTestimonial.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      });
  },
});

export default testimonialSlice.reducer;