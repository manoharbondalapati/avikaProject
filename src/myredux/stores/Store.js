import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../reducers/AdminSlice";
import recordsReducer from "../reducers/RecordsSlice";
import userReducer from "../reducers/UserSlice";
import uploadReducer from "../reducers/UploadSlice";

import patientReducer from "../reducers/PatientSlice";

const store = configureStore({
  reducer: {
    adminlogin: adminReducer,
    records: recordsReducer,
    details: patientReducer,
    userlogin: userReducer,
    fileUpload: uploadReducer,
  },
});

export default store;
