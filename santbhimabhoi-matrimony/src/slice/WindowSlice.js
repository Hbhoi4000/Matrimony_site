import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../config";


// API Call
export const fetchWindowProfiles = createAsyncThunk(
    "window/fetchWindowProfiles",
    async () => {

        const response = await fetch(
            `${API_BASE_URL}/window`
        );

        const data = await response.json();

        return data;
    }
);





const initialState = {

    windowProfiles: [],

    selectedWindowProfile: null,

    loading: false,

    error: null
};


const windowSlice = createSlice({

    name: "window",

    initialState,

    reducers: {


        selectWindowProfile: (state, action) => {

            state.selectedWindowProfile = action.payload;

        }

    },


    extraReducers: (builder) => {

        builder

            // API start
            .addCase(fetchWindowProfiles.pending, (state) => {

                state.loading = true;

            })


            // API success
            .addCase(fetchWindowProfiles.fulfilled, (state, action) => {

                state.loading = false;

                state.windowProfiles = action.payload;

            })


            // API failed
            .addCase(fetchWindowProfiles.rejected, (state, action) => {

                state.loading = false;

                state.error = action.error.message;

            })


    }

});


export const { selectWindowProfile } = windowSlice.actions;


export default windowSlice.reducer;
