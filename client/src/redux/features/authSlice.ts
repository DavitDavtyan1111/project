// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  status: null,
  isLoading: false,
  isAuthenticated: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ firstName, lastName, email, password }) => {
    try {
      const { data } = await axios.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    try {
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMe = createAsyncThunk("auth/getMe", async () => {
  try {
    const { data } = await axios.get("/auth/me");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      state.token = null;
      state.status = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: {
    // [registerUser.pending]: () => {},
    [registerUser.fulfilled]: (state, action) => {
      state.status = action.payload.message;
      state.user = action.payload.user;
    },
    //login
    [loginUser.pending]: (state, action) => {
      state.status = null;
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    // get me
    [getMe.pending]: (state, action) => {
      state.status = null;
      state.isLoading = true;
    },
    [getMe.fulfilled]: (state, action) => {
      state.status = null;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.isAuthenticated = true;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
