import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../config";

const savedUser = typeof window !== "undefined" ? localStorage.getItem("authUser") : null;
const initialUser = savedUser ? JSON.parse(savedUser) : null;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email || credentials.username,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);

        let errorMessage = "Login Failed";
        if (Array.isArray(errorBody?.detail)) {
          const firstError = errorBody.detail[0];
          const field = firstError?.loc?.[1] || "field";
          errorMessage = `${firstError?.msg || "Validation error"} on '${field}'`;
        } else if (typeof errorBody?.detail === "string") {
          errorMessage = errorBody.detail;
        }

        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "An unexpected error occurred");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ userId, profileData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profiles/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || "Failed to update profile");
      }

      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message || "An error occurred while updating profile");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: initialUser,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("authUser");
      }
    },
    clearLoginError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Login User Cases ---
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // If API returns { user: {...} }, use action.payload.user; otherwise action.payload
        state.user = action.payload.user || action.payload; 
        state.error = null;
        if (typeof window !== "undefined") {
          localStorage.setItem("authUser", JSON.stringify(state.user));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Update Profile Cases ---
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        // Update user state with updated fields returned from API
        const updatedUserData = action.payload.user || action.payload;
        state.user = { ...state.user, ...updatedUserData };
        state.error = null;

        // Persist updated profile back to LocalStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("authUser", JSON.stringify(state.user));
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearLoginError } = loginSlice.actions;
export default loginSlice.reducer;