import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../config";

export const registerUser = createAsyncThunk(

    "auth/registerUser",

    async (userData, { rejectWithValue }) => {

        try {

            const response = await fetch(
                `${API_BASE_URL}/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(userData)
                }
            );


            if (!response.ok) {

                throw new Error("Registration Failed");

            }


            const data = await response.json();


            return data;


        } catch (error) {

            return rejectWithValue(error.message);

        }

    }

);



const initialState = {

    user: null,

    loading: false,

    error: null,

    success: false

};



const authSlice = createSlice({

    name: "auth",

    initialState,


    reducers: {


        logout: (state) => {

            state.user = null;

        }


    },


    extraReducers: (builder) => {


        builder


            // API Calling
            .addCase(registerUser.pending, (state) => {

                state.loading = true;

                state.error = null;

            })


            // API Success
            .addCase(registerUser.fulfilled, (state, action) => {

                state.loading = false;

                state.user = action.payload;

                state.success = true;

            })


            // API Failed
            .addCase(registerUser.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

    }

});


export const { logout } = authSlice.actions;


export default authSlice.reducer;