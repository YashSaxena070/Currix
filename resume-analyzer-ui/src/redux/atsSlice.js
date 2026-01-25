import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const analyzeResume = createAsyncThunk(
    "ats/analyze",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(API_PATHS.RESUME.ANALYZE, formData);
            return res.data;
        } catch (err) {
            // 2. Custom error handling logic
            if (err.response) {
                // The server responded with a status code outside the 2xx range
                // You can return a custom string here to hide the status code
                // If your backend sends a specific error message, use err.response.data.message
                return rejectWithValue(
                    err.response.data?.message || "We encountered an issue analyzing your resume. Please try again."
                );
            } else if (err.request) {
                // The request was made but no response was received
                return rejectWithValue("Network error. Please check your internet connection.");
            } else {
                // Something happened in setting up the request
                return rejectWithValue("An unexpected error occurred.");
            }
        }
    }
);


const initialState = {
  isLoading: false,
  atsScore: null,
  strengths: [],
  gaps: [],
  fixes: [],
  error: null
};

const atsSlice = createSlice({
    name: "ats",
    initialState,
    reducers: {
        resetAnalysis: (state) => {
            state.atsScore = null;
            state.strengths = [];
            state.gaps = [];
            state.fixes = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(analyzeResume.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(analyzeResume.fulfilled, (state,action) => {
                state.isLoading = false;
                Object.assign(state, action.payload);
            })
            .addCase(analyzeResume.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Something went wrong. Please try again.";
            });
    }
});

export const { resetAnalysis } = atsSlice.actions;
export default atsSlice.reducer;