import React, { useEffect, useState } from "react";
import "./UserPage.css";
import { useDispatch, useSelector } from "react-redux"; // Removed unused import
import { fileUpload } from "../../myredux/reducers/UploadSlice";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { UserLogout } from "../../myredux/reducers/UserSlice";

const UserPage = () => {
  const [formData, setFormData] = useState({
    op_number: "",
    ip_number: "",
    patient_name: "",
    age: "",
    gender: "",
    place: "",
    Date_of_registration: "",
    referrence_by: "",
    patient_id: "",
    file_path: null,
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  const isLoading = useSelector((state) => state.fileUpload.isLoading);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fileUpload(formData, token));

    setFormData({
      op_number: "",
      ip_number: "",
      patient_name: "",
      age: "",
      gender: "",
      place: "",
      Date_of_registration: "",
      referrence_by: "",
      patient_id: "",
      file_path: null,
    });
    setShowForm(false);
  };

  useEffect(() => {
    if (!token) {
      navigate("/userlogin");
    }
  }, [navigate, token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, file_path: file });
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const todayDate = new Date().toISOString().split("T")[0];

  const handleLogout = () => {
    dispatch(UserLogout());
    localStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <div className="medical-form">
      <div className="form-headerbar">
        <div className="image">
          <img
            src="https://res.cloudinary.com/dpfnyv0ut/image/upload/v1709751594/avika-img_msxfud.png"
            alt="logo"
          ></img>
        </div>
        <div className="dropdown">
          <button id="userlogout" type="button" onClick={toggleDropdown}>
            <FaCircleUser size={30} />
          </button>
          {dropdownVisible && (
            <div className="dropdown-contentss">
              <p>Sharath</p>
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>
      </div>
      <div className="form-modal">
        <h1 onClick={() => setShowForm(true)}> Upload Medical Document</h1>
      </div>
      <div className="form-display">
        <Modal show={showForm} onHide={() => setShowForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Patient Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit} className="userform">
              <div className="form-row">
                <div className="input-data">
                  <input
                    type="text"
                    name="op_number"
                    value={formData.op_number}
                    onChange={handleChange}
                    required
                  />

                  <div className="underline"></div>
                  <label>OP Number</label>
                </div>
                <div className="input-data">
                  <input
                    type="text"
                    name="ip_number"
                    value={formData.ip_number}
                    onChange={handleChange}
                    required
                  />
                  <div className="underline"></div>
                  <label>IP Number</label>
                </div>
              </div>
              <div className="form-row">
                <div className="input-data">
                  <input
                    type="text"
                    name="patient_name"
                    value={formData.patient_name}
                    onChange={handleChange}
                    required
                  />
                  <div className="underline"></div>
                  <label>Name</label>
                </div>
                <div className="input-data">
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                  <div className="underline"></div>
                  <label>Age</label>
                </div>
              </div>
              <div className="form-row">
                <div className="input-data">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <div className="underline"></div>
                  <label>Gender</label>
                </div>
                <div className="input-data">
                  <input
                    type="text"
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    required
                  />
                  <div className="underline"></div>
                  <label>Place</label>
                </div>
              </div>
              <div className="form-row">
                <div className="input-data">
                  <input
                    type="date"
                    name="Date_of_registration"
                    value={formData.Date_of_registration}
                    onChange={handleChange}
                    max={todayDate}
                    required
                  />
                  <div className="underline"></div>
                  <label>Date</label>
                </div>
                <div className="input-data">
                  <input
                    type="text"
                    name="referrence_by"
                    value={formData.referrence_by}
                    onChange={handleChange}
                    required
                  />
                  <div className="underline"></div>
                  <label>Reference By</label>
                </div>
              </div>
              <div className="form-row">
                <div className="input-data">
                  <input
                    type="text"
                    name="patient_id"
                    value={formData.patient_id}
                    onChange={handleChange}
                    required
                  />
                  <div className="underline"></div>
                  <label>Patient ID</label>
                </div>
                <div className="input-data">
                  <input
                    type="file"
                    name="file_path"
                    onChange={handleFileChange}
                  />

                  <div className="underline"></div>
                  <label>
                    File Path <span id="pdffile">&#40;pdf only&#41;</span>
                  </label>
                </div>
              </div>
              <div className="form-row submit-btn">
                <div className="submit-button">
                  <button type="submit">
                    {isLoading ? "Uploading..." : "Submit"}
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={handleFormClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default UserPage;
