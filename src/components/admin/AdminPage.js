import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecords } from "../../myredux/reducers/RecordsSlice";
import { Table, Pagination } from "react-bootstrap";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AdminPage.css";
import { AdminLogout } from "../../myredux/reducers/AdminSlice";

const AdminPage = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("adminToken");
  const { records } = useSelector((state) => state.records);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [opNumberSearch, setOpNumberSearch] = useState(""); 
  const [ipNumberSearch, setIpNumberSearch] = useState(""); 
  const [genderFilter, setGenderFilter] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/adminlogin");
    } else {
      dispatch(fetchRecords());
    }
  }, [dispatch, token, navigate]);

  const filterRecords = records.filter(
    (record) =>
      record?.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!genderFilter ||
        record.gender.toLowerCase() === genderFilter.toLowerCase()) &&
      (!startDate || new Date(record.Date_of_registration) >= startDate) &&
      (!endDate || new Date(record.Date_of_registration) <= endDate) &&
      (!opNumberSearch || record.op_number === opNumberSearch) && 
      (!ipNumberSearch || record.ip_number === ipNumberSearch)
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filterRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    dispatch(AdminLogout());
    localStorage.clear("adminToken");
    navigate("/");
  };

  const handlePatientDetails = (recordId) => {
    const token = localStorage.getItem("adminToken");
    if (token !== null) navigate(`/patientdetails/${recordId}`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div id="allrecords">
      <div id="container" className="table-responsive">
        <div id="headline1">
          <div>
            <img
              src="https://res.cloudinary.com/dpfnyv0ut/image/upload/v1709751594/avika-img_msxfud.png"
              alt=""
            ></img>
          </div>
          <div id="logout-icon" className="dropdown">
            <button id="adminlogout" onClick={toggleDropdown}>
              <CiUser size={30} />
            </button>
            {dropdownVisible && (
              <div className="dropdown-contents">
                <p>Harish</p>
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>
        </div>
        <div className="table-container">
          <div id="headline2">
            <div>
              <h3 id="recordsh3">All Documents</h3>
            </div>
            <div id="lengthpart">
              <p className="length">
                All Documents: {filterRecords.length}
              </p>
            </div>
          </div>
          <div className="headerbar">
            <div className="part1">
              <div className="inputsgap">
                <input
                  id="namesearch"
                  type="search"
                  placeholder="Search Patient name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div  className="inputsgap">
                <input
                  id="opNumberSearch"
                  type="search"
                  placeholder="Search by OP Number"
                  value={opNumberSearch}
                  onChange={(e) => setOpNumberSearch(e.target.value)}
                />
              </div>
              <div className="inputsgap">
                <input
                  id="ipNumberSearch"
                  type="search"
                  placeholder="Search by IP Number"
                  value={ipNumberSearch}
                  onChange={(e) => setIpNumberSearch(e.target.value)}
                />
              </div>
              <div>
                <select
                  id="genderselect"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    setGenderFilter(
                      e.target.value === "all" ? null : e.target.value
                    )
                  }
                >
                  <option value="all">select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div id="datefilter">
              <span id="datepicker">DateofRegistration </span>
              <div className="dates">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="From Date"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="To Date"
                />
              </div>
            </div>
          </div>
          {currentRecords.length === 0 && <h1 className="norecords">No records found</h1>}
          {currentRecords.length > 0 && (
               <Table bordered hover id="tabledata">
               <thead id="heads">
                 <tr>
                   <th>S_NO</th>
                   <th>Patient Name</th>
                   <th>Age</th>
                   <th>Gender</th>
                   <th>Date of Registration</th>
                   <th>Place</th>
                   <th>Uploaded Date</th>
                   <th>OP Number</th>
                   <th>IP Number</th>
                   <th>Actions</th>
                 </tr>
               </thead>
   
               <tbody>
                 {currentRecords.map((record, index) => (
                   <tr key={record.id} style={{ backgroundColor: "gray" }}>
                     <td>{indexOfFirstRecord + index + 1}</td>
                     <td>{record.patient_name}</td>
                     <td>{record.age}</td>
                     <td>{record.gender}</td>
                     <td>{record.Date_of_registration}</td>
                     <td>{record.place}</td>
                     <td>{record.created_at}</td>
                     <td>{record.op_number}</td>
                     <td>{record.ip_number}</td>
                     <td>
                       <button
                         className="btn"
                         id="adminpagebtn"
                         onClick={() => handlePatientDetails(record.id)}
                       >
                         Details
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </Table>
          )}
           <div className="pagination-container">
            <Pagination className="pagination">
              <Pagination.First
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {Array.from({
                length: Math.ceil(filterRecords.length / recordsPerPage),
              }).map(
                (_, i) =>
                  i >= currentPage - 3 &&
                  i < currentPage + 3 && (
                    <Pagination.Item
                      className="pagination-item"
                      key={i}
                      onClick={() => paginate(i + 1)}
                      active={i + 1 === currentPage}
                    >
                      {i + 1}
                    </Pagination.Item>
                  )
              )}
              <Pagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(filterRecords.length / recordsPerPage)
                }
              />
              <Pagination.Last
                onClick={() =>
                  paginate(Math.ceil(filterRecords.length / recordsPerPage))
                }
                disabled={
                  currentPage ===
                  Math.ceil(filterRecords.length / recordsPerPage)
                }
              />
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
