import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../config";


// API Call
export const fetchBrides = createAsyncThunk(
  "bride/fetchBrides",
  async () => {

    const response = await fetch(
      `${API_BASE_URL}/profiles/brides`
    );

    const data = await response.json();

    return data;
  }
);


const initialState = {

  brides: [],

  selectedBride: null,

  loading: false,

  error: null
};


const brideSlice = createSlice({

  name: "bride",

  initialState,

  reducers: {


    selectBride: (state, action) => {

      state.selectedBride = action.payload;

    }

  },


  extraReducers: (builder)=>{

    builder

    // API start
    .addCase(fetchBrides.pending,(state)=>{

      state.loading = true;

    })


    // API success
    .addCase(fetchBrides.fulfilled,(state,action)=>{

      state.loading = false;

      state.brides = action.payload;

    })


    // API failed
    .addCase(fetchBrides.rejected,(state,action)=>{

      state.loading = false;

      state.error = action.error.message;

    })


  }

});


export const {selectBride} = brideSlice.actions;


export default brideSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   brides: [],

//   selectedBride: null,
// };

// const brideSlice = createSlice({
//   name: "bride",
//   initialState,

//   reducers: {
//     selectBride: (state, action) => {
//       state.selectedBride = action.payload;
//     },
//   },
// });

// export const { selectBride } = brideSlice.actions;
// export default brideSlice.reducer;