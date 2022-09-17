import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// get user from localstorage

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoginSuccess: false,
  isLogoutSuccess: false,
  message: "",
};

// register user

export const signup = createAsyncThunk(
  "/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// verify otp

export const submitOtp = createAsyncThunk(
  "/submitOtp",
  async (otp, thunkAPI) => {
    try {
      return await authService.submitOtp(otp);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// login 

export const login = createAsyncThunk(
    "/login",
    async (userData, thunkAPI) => {
      try {
        return await authService.login(userData);
      } catch (err) {
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

//   logout

export const logout = createAsyncThunk(
    "/logout",
    async ( thunkAPI) => {
      try {
        return await authService.logout();
      } catch (err) {
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );



export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = false;
      state.isLogoutSuccess = false;
      state.isLoginSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(submitOtp.pending, (state) => {
        state.isLoading = true;
  
      })
      .addCase(submitOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true
        state.isLogoutSuccess = false;
        state.isLoginSuccess = false
      })
      .addCase(submitOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoginSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isLoginSuccess = false;
        state.isLogoutSuccess = true;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
