import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../config";

// Helper to safely fetch initial user state from localStorage
const getInitialUser = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("authUser");
    return saved ? JSON.parse(saved) : null;
  }
  return null;
};

// --- Async Thunks ---

// 1. Send OTP Thunk
export const sendOTP = createAsyncThunk(
  "auth/sendOTP",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email || credentials.username,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);

        let errorMessage = "Failed to send OTP";
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

// 2. Verify OTP Thunk
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ userId, profileData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, ...profileData }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || "Failed to verify OTP");
      }

      return await response.json();
    } catch (err) {
      return rejectWithValue(
        err.message || "An error occurred while verifying OTP"
      );
    }
  }
);
// Async thunk for resetting password
export const resetPassword = createAsyncThunk(
  "forgotPassword/resetPassword",
  async ({ email, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/reset-password", {
        email,
        newPassword,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to reset password"
      );
    }
  }
);
// --- Auth Slice ---

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getInitialUser(),
    loading: false,
    error: null,
    otpSent: false,
    otpVerified: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.otpSent = false;
      state.otpVerified = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("authUser");
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    resetOtpState: (state) => {
      state.otpSent = false;
      state.otpVerified = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Send OTP Cases ---
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpSent = false;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
        state.error = null;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.otpSent = false;
        state.error = action.payload;
      })

      // --- Verify OTP Cases ---
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpVerified = false;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerified = true;
        state.user = action.payload.user || action.payload;
        state.error = null;

        if (typeof window !== "undefined") {
          localStorage.setItem("authUser", JSON.stringify(state.user));
        }
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.otpVerified = false;
        state.error = action.payload;
      })
      // --- Reset Password Cases ---
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.passwordResetSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, resetOtpState } = authSlice.actions;
export default authSlice.reducer;