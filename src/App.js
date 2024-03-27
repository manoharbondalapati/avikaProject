import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import UserPage from "./components/user/UserPage";
import AdminLogin from "./components/admin/AdminLogin";
import AdminPage from "./components/admin/AdminPage";
import PatientDetails from "./components/admin/PatientDetails";
import { Provider } from "react-redux";
import Store from "../src/myredux/stores/Store";
import "./App.css";
import UserLogin from "./components/user/UserLogin";

const App = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route
            path="/patientdetails/:recordId"
            element={<PatientDetails />}
          />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/userpage" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
