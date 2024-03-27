import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";

export const loginUser = (userCredentails, navigate) => async (dispatch) => {
  dispatch(UserLoginStarted());
  try {
    const response = await axios.post(
      "https://med.test.avika.ai/auth/login",
      userCredentails
    );

    localStorage.setItem("userToken", response.data.data.token);
    dispatch(UserLoginSuccess(response.data));
    message.success("Login Success");
    navigate("/userpage");
  } catch (error) {
    dispatch(UserLoginFailed("Invalid Credentials"));
    message.error("Invalid Credentails");
  }
};

const userSlice = createSlice({
  name: "userlogin",
  initialState: {
    loading: false,
    user: null,
    error: null,
    isUserLogin: false,
  },
  reducers: {
    UserLoginStarted: (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    },
    UserLoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isUserLogin = true;
      state.error = null;
    },
    UserLoginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UserLogout: (state) => {
      state.isUserLogin = false;
    },
  },
});
export const {
  UserLoginStarted,
  UserLoginSuccess,
  UserLoginFailed,
  UserLogout,
} = userSlice.actions;
export default userSlice.reducer;
