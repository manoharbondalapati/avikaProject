import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";

export const fileUpload = (formData) => async (dispatch) => {
  dispatch(uploadFileRequest());
  try {
    const token = localStorage.getItem("userToken");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const response = await axios.post(
      "https://med.test.avika.ai/api/file_upload",
      formData,
      { headers }
    );

    dispatch(uploadFileSuccess(response.data));
    message.success("File uploaded successfully");
  } catch (error) {
    dispatch(uploadFileFailure(error.message));
    message.error("File upload failed");
  }
};

const UploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {
    uploadFileRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    uploadFileSuccess(state, action) {
      state.isLoading = false;
    },
    uploadFileFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { uploadFileRequest, uploadFileSuccess, uploadFileFailure } =
  UploadSlice.actions;

export default UploadSlice.reducer;
