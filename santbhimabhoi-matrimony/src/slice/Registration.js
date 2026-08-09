import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../config";

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (formDataPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        // DO NOT set 'Content-Type': 'multipart/form-data' here!
        // The browser attaches the multipart boundary automatically when passing FormData in body.
        body: formDataPayload, 
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        // Extract FastAPI validation error messages if available
        const message = 
          typeof errorBody?.detail === "string" 
            ? errorBody.detail 
            : Array.isArray(errorBody?.detail) 
            ? errorBody.detail.map((err) => `${err.loc.join("->")}: ${err.msg}`).join(", ")
            : "Registration Failed";
            
        return rejectWithValue(message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;