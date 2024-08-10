import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  errorAuth: false,
  successAuth: false,
  loadingAuth: false,
}

export const Register = createAsyncThunk(
  "auth/register",
  async (body, thunkAPI) => {
    const data = await authService.Register(body);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const Login = createAsyncThunk(
  "auth/login",
  async (body, thunkAPI) => {
    const data = await authService.Login(body);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(Register.pending, (state) => {
        state.loadingAuth = true;
        state.errorAuth = false;
      })
      .addCase(Register.fulfilled, (state) => {
        state.loadingAuth = false;
        state.successAuth = true;
        state.errorAuth = false;
      })
      .addCase(Register.rejected, (state) => {
        state.loadingAuth = false;
        state.errorAuth = true;
      })
      .addCase(Login.pending, (state) => {
        state.loadingAuth = true;
        state.errorAuth = false;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loadingAuth = false;
        state.successAuth = true;
        state.errorAuth = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(Login.rejected, (state) => {
        state.loadingAuth = false;
        state.errorAuth = true;
        state.userAuth = null;
      })
  },
});

export default authSlice.reducer;
