import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import toast from "react-hot-toast";

const initialState = {
  resume: null,
  isLoading: false,
  error: null,
};

export const fetchResumeById = createAsyncThunk(
  "resume/fetchResumeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(id));
      const data = response.data;
      
      // Flatten template data for frontend use
      if (data.template) {
        data.theme = data.template.theme;
        data.colorPalette = data.template.colorPalette;
      }
      
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch resume");
    }
  }
);

export const updateResume = createAsyncThunk(
  "resume/updateResume",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      // Transform flat data to nested structure for backend
      const payload = {
        ...data,
        template: {
          theme: data.theme,
          colorPalette: data.colorPalette
        }
      };

      const response = await axiosInstance.put(API_PATHS.RESUME.UPDATE(id), payload);
      const responseData = response.data;

      // Flatten response data back for frontend
      if (responseData.template) {
        responseData.theme = responseData.template.theme;
        responseData.colorPalette = responseData.template.colorPalette;
      }

      return responseData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update resume");
    }
  }
);

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    updateResumeLocal: (state, action) => {
      state.resume = { ...state.resume, ...action.payload };
    },
    clearResume: (state) => {
      state.resume = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Resume
      .addCase(fetchResumeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchResumeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resume = action.payload;
      })
      .addCase(fetchResumeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Update Resume
      .addCase(updateResume.pending, (state) => {
        // We might not want to show global loading for auto-saves
        // state.isLoading = true; 
      })
      .addCase(updateResume.fulfilled, (state, action) => {
        state.isLoading = false;
        // Ideally, we merge the response, but for now, we trust local updates mostly
        // state.resume = action.payload; 
      })
      .addCase(updateResume.rejected, (state, action) => {
        state.isLoading = false;
        // toast.error("Failed to save changes"); // Optional: Don't spam user on auto-save fail
      });
  },
});

export const { updateResumeLocal, clearResume } = resumeSlice.actions;
export default resumeSlice.reducer;
