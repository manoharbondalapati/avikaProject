import React, { useState, useEffect } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecordById } from "../../myredux/reducers/PatientSlice";
import { useNavigate, useParams } from "react-router-dom";
import "./PatientDetails.css";
import { AdminLogout } from "../../myredux/reducers/AdminSlice";

const PatientDetails = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { details, loading, error } = useSelector((state) => state.details);
  const dispatch = useDispatch();
  const token = localStorage.getItem("adminToken");
  const { recordId } = useParams();

  useEffect(() => {
    if (!token) {
      navigate("/adminlogin");
    } else {
      dispatch(fetchRecordById(recordId));
    }
  }, [dispatch, token, recordId, navigate]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    dispatch(AdminLogout());

    localStorage.removeItem("adminToken");
    navigate("/");
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  const handeBack = () => {
    navigate("/adminpage");
  };

  const handleViewFile = () => {
    if (details && details.file_path) {
      window.open(details.file_path, "_blank");
    } else {
      console.error("PDF URL not available");
    }
  };

  return (
    <div id="patientDetailsPage">
      <div className="patientcontainers">
        <div id="headerbar">
          <div>
            <img
              src="https://res.cloudinary.com/dpfnyv0ut/image/upload/v1709751594/avika-img_msxfud.png"
              alt=""
            ></img>
          </div>
          <div className="dropdown">
            <button id="patientlogout" onClick={toggleDropdown}>
              <FaRegUserCircle size={40} />
            </button>
            {dropdownVisible && (
              <div className="dropdown-content">
                <p>Harish</p>
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>
        </div>
        <div className="headerbar2">
          <div>
            <button id="backbutton" onClick={handeBack}>
              <IoChevronBackCircleOutline size={40} />
            </button>
          </div>
          <div className="logoutdiv">
            <button id="view-file" onClick={handleViewFile}>
              View File
            </button>
          </div>
        </div>
        <div id="details">
          <h3 id="detailsh3">Patient Details</h3>
          <hr />
          <div className="detail-item">
            <p>
              <span>Patient Name:</span>
              {details.patient_name}
            </p>
          </div>
          <div className="detail-item">
            <p>
              <span>Patient Age:</span> {details.age}
            </p>
          </div>
          <div className="detail-item">
            <p>
              <span> Gender:</span>
              {details.gender}
            </p>
          </div>
          <div className="detail-item">
            <p>
              <span> Date of Registration:</span>

              {details.Date_of_registration}
            </p>
          </div>
          <div className="detail-item">
            <p>
              <span> Place:</span>
              {details.place}
            </p>
          </div>
          <div className="detail-item">
            <p>
              <span> OP Number:</span>
              {details.op_number}
            </p>
          </div>
          <div className="detail-item">
            <p>
              <span> IP Number:</span>
              {details.op_number}
            </p>
          </div>
          <div className="detail-item">
            <p>
              <span> Referencer by:</span>
              {details.op_number}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
