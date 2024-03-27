import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";

export const loginAdmin = (adminCredentials, navigate) => async (dispatch) => {
  dispatch(AdminLoginStarted());
  try {
    const response = await axios.post(
      "https://med.test.avika.ai/auth/admin-login",
      adminCredentials
    );

    localStorage.setItem("adminToken", response.data.data.token);
    dispatch(AdminLoginSuccess(response.data));
    message.success("Login Success");
    navigate("/adminpage");
  } catch (error) {
    dispatch(AdminLoginFailed("Invalid Credentials"));
    message.error("Invalid Credentials");
  }
};

const adminSlice = createSlice({
  name: "adminlogin",
  initialState: {
    loading: false,
    admin: null,
    error: null,
    isAdminLogin: false,
  },
  reducers: {
    AdminLoginStarted: (state) => {
      state.loading = true;
      state.admin = null;
      state.error = null;
    },
    AdminLoginSuccess: (state, action) => {
      state.loading = false;
      state.admin = action.payload;
      state.isAdminLogin = true;
      state.error = null;
    },
    AdminLoginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    AdminLogout: (state) => {
      state.isAdminLogin = false;
    },
  },
});

export const {
  AdminLoginStarted,
  AdminLoginSuccess,
  AdminLoginFailed,
  AdminLogout,
} = adminSlice.actions;
export default adminSlice.reducer;
