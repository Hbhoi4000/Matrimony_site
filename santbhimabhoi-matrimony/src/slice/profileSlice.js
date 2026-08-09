import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../config";

// Async thunk to fetch recent 3 profiles (for Home page)
export const fetchRecentProfiles = createAsyncThunk(
  "profiles/fetchRecentProfiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profiles`);
      if (!response.ok) throw new Error("Failed to load profiles");
      const data = await response.json();

      return [...data]
        .sort((a, b) => Number(b.id) - Number(a.id))
        .slice(0, 3);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch a single profile by ID (for Profile page)
export const fetchProfileById = createAsyncThunk(
  "profiles/fetchProfileById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profiles/${id}`);
      if (!response.ok) throw new Error("Profile not found");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profiles",
  initialState: {
    recentProfiles: [],
    selectedProfile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedProfile: (state) => {
      state.selectedProfile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Recent Profiles
      .addCase(fetchRecentProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.recentProfiles = action.payload;
      })
      .addCase(fetchRecentProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Profile By ID
      .addCase(fetchProfileById.pending, (state) => {
        state.loading = true;
        state.selectedProfile = null;
        state.error = null;
      })
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProfile = action.payload;
      })
      .addCase(fetchProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedProfile } = profileSlice.actions;
export default profileSlice.reducer;