import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../config";


// API Call
export const fetchGrooms = createAsyncThunk(
  "groom/fetchGrooms",
  async () => {

    const response = await fetch(
      `${API_BASE_URL}/profiles/grooms`
    );

    const data = await response.json();

    return data;
  }
);


const initialState = {

  grooms: [],

  selectedGroom: null,

  loading: false,

  error: null
};


const groomSlice = createSlice({

  name: "groom",

  initialState,

  reducers: {


    selectGroom: (state, action) => {

      state.selectedGroom = action.payload;

    }

  },


  extraReducers: (builder) => {

    builder

      // API start
      .addCase(fetchGrooms.pending, (state) => {

        state.loading = true;

      })


      // API success
      .addCase(fetchGrooms.fulfilled, (state, action) => {

        state.loading = false;

        state.grooms = action.payload;

      })


      // API failed
      .addCase(fetchGrooms.rejected, (state, action) => {

        state.loading = false;

        state.error = action.error.message;

      })


  }

});


export const { selectGroom } = groomSlice.actions;


export default groomSlice.reducer;
