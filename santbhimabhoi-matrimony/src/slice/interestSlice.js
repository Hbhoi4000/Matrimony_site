import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../config";

// Async thunk to send interest to a profile
export const sendInterest = createAsyncThunk(
  "interest/sendInterest",
  async ({ senderId, receiverId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/interests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_id: senderId,
          receiver_id: receiverId,
          status: "pending",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to send interest");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch received interests (for Navbar badge)
export const fetchMyInterests = createAsyncThunk(
  "interest/fetchMyInterests",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/interests?receiver_id=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch interests");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const interestSlice = createSlice({
  name: "interest",
  initialState: {
    receivedInterests: [],
    loading: false,
    error: null,
    sentSuccess: false,
  },
  reducers: {
    resetInterestStatus: (state) => {
      state.sentSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send Interest
      .addCase(sendInterest.pending, (state) => {
        state.loading = true;
        state.sentSuccess = false;
      })
      .addCase(sendInterest.fulfilled, (state) => {
        state.loading = false;
        state.sentSuccess = true;
      })
      .addCase(sendInterest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Received Interests
      .addCase(fetchMyInterests.fulfilled, (state, action) => {
        state.receivedInterests = action.payload;
      });
  },
});

export const { resetInterestStatus } = interestSlice.actions;
export default interestSlice.reducer;