import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

// Configure axios instance
// Removed local api instance creation as we are using axiosInstance

// Async thunks
export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, registerData);
      const data = response.data;
      
      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Registration failed'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, loginData);
      const data = response.data;
      
      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Login failed'
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  'user/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.PROFILE);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch profile'
      );
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'user/verifyEmail',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.VERIFY_EMAIL, {
        params: { token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Email verification failed'
      );
    }
  }
);

export const resendVerification = createAsyncThunk(
  'user/resendVerification',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.RESEND_VERIFICATION, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to resend verification email'
      );
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  'user/uploadProfileImage',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await axiosInstance.post(API_PATHS.AUTH.UPLOAD_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to upload image'
      );
    }
  }
);

// Initial state
const initialState = {
  user: {
    id: null,
    name: null,
    email: null,
    profileImageUrl: null,
    subscriptionPlan: 'basic',
    emailVerified: false,
    createdAt: null,
    updatedAt: null,
  },
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
  message: null,
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {
        id: null,
        name: null,
        email: null,
        profileImageUrl: null,
        subscriptionPlan: 'basic',
        emailVerified: false,
        createdAt: null,
        updatedAt: null,
      };
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.message = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        localStorage.setItem('token', action.payload);
      } else {
        localStorage.removeItem('token');
      }
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          profileImageUrl: action.payload.profileImageUrl,
          subscriptionPlan: action.payload.subscriptionPlan || 'basic',
          emailVerified: action.payload.emailVerified || false,
          createdAt: action.payload.createdAt,
          updatedAt: action.payload.updatedAt,
        };
        state.token = action.payload.token;
        state.isAuthenticated = !!action.payload.token;
        state.message = 'Registration successful! Please verify your email.';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          profileImageUrl: action.payload.profileImageUrl,
          subscriptionPlan: action.payload.subscriptionPlan || 'basic',
          emailVerified: action.payload.emailVerified || false,
          createdAt: action.payload.createdAt,
          updatedAt: action.payload.updatedAt,
        };
        state.token = action.payload.token;
        state.isAuthenticated = !!action.payload.token;
        state.message = 'Login successful!';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Get Profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          profileImageUrl: action.payload.profileImageUrl,
          subscriptionPlan: action.payload.subscriptionPlan || 'basic',
          emailVerified: action.payload.emailVerified || false,
          createdAt: action.payload.createdAt,
          updatedAt: action.payload.updatedAt,
        };
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // If profile fetch fails, user might not be authenticated
        if (action.payload.includes('401') || action.payload.includes('Unauthorized')) {
          state.isAuthenticated = false;
          state.token = null;
          localStorage.removeItem('token');
        }
      });

    // Verify Email
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.user.emailVerified = true;
        state.message = 'Email verified successfully!';
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Resend Verification
    builder
      .addCase(resendVerification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendVerification.fulfilled, (state) => {
        state.isLoading = false;
        state.message = 'Verification email sent successfully!';
      })
      .addCase(resendVerification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Upload Profile Image
    builder
      .addCase(uploadProfileImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.isLoading = false;
        // Assuming the response contains imageUrl or similar
        if (action.payload.imageUrl || action.payload.url) {
          state.user.profileImageUrl = action.payload.imageUrl || action.payload.url;
        }
        state.message = 'Profile image uploaded successfully!';
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, clearMessage, updateUser, setToken } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;
export const selectMessage = (state) => state.user.message;
export const selectEmailVerified = (state) => state.user.user.emailVerified;
export const selectSubscriptionPlan = (state) => state.user.user.subscriptionPlan;

export default userSlice.reducer;

