import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import SignupController from "../controllers/SignupController";
import AuthController from "../controllers/AuthController";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../utils/localStorage";
import { registerUserThunk } from "./userThunk";
const userFromLocalStorage = getUserFromLocalStorage();
const initialState = {
  isLoading: "",
  isLoadingButton: false,
  user: userFromLocalStorage !== null ? userFromLocalStorage : undefined,
};
//*API calls
export const registerUser = createAsyncThunk(
  "auth/signup",
  async (user, thunkAPI) => {
    try {
      const response = await new SignupController().registerUser(user);
      const { data } = response;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      const response = await new AuthController().authenticateUser(user);
      const { data } = response;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = "pending";
      state.isLoadingButton = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      console.log("🚀 ~ file: userSlice.js:52 ~ payload:", payload);
      state.isLoading = "fulfilled";
      state.isLoadingButton = false;
      state.user = payload;
      addUserToLocalStorage(payload);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = "rejected";
      state.isLoadingButton = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = "pending";
      state.isLoadingButton = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log("🚀 ~ file: userSlice.js:52 ~ payload:", payload);
      state.isLoading = "fulfilled";
      state.isLoadingButton = false;
      state.user = payload;
      addUserToLocalStorage(payload);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = "rejected";
      state.isLoadingButton = false;
      toast.error(payload);
    },
  },
});

export default userSlice.reducer;
