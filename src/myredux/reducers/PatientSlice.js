import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  details: [],
  loading: false,
  error: null,
};

const PatientSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    fetchDetailsSuccess: (state, action) => {
      state.details = action.payload;
      state.loading = false;
    },
    fetchDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { fetchDetailsSuccess, fetchDetailsFailure } =
  PatientSlice.actions;

export const fetchRecordById = (recordId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("adminToken");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(
      `https://med.test.avika.ai/admin/getMedicalRecord/${recordId}`,
      { headers }
    );
    dispatch(fetchDetailsSuccess(response.data.data));
  } catch (error) {
    dispatch(fetchDetailsFailure({ message: error.message }));
  }
};

export default PatientSlice.reducer;
