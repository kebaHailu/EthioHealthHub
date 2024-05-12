// import React from "react";
// import DashboardLayout from "../DashboardLayout/DashboardLayout";
// import moment from "moment";
// import './MyPatients.css'
// import { Link } from "react-router-dom";
// import {
//   FaClock,
//   FaEnvelope,
//   FaLocationArrow,
//   FaPhoneAlt,
// } from "react-icons/fa";
// import { Empty, Button } from "antd";

// const MyPatients = () => {
//   // Sample patient data
//   const patients = [
//     {
//       id: 1,
//       firstName: "John",
//       lastName: "Doe",
//       gender: "Male",
//       appointmentTime: "2024-05-04",
//       address: "123 Main St",
//       email: "john@example.com",
//       mobile: "123-456-7890",
//     },
//     {
//       id: 2,
//       firstName: "Jane",
//       lastName: "Smith",
//       gender: "Female",
//       appointmentTime: "2024-05-05",
//       address: "456 Elm St",
//       email: "jane@example.com",
//       mobile: "987-654-3210",
//     },
//     {
//       id: 3,
//       firstName: "Alice",
//       lastName: "Johnson",
//       gender: "Female",
//       appointmentTime: "2024-05-06",
//       address: "789 Oak St",
//       email: "alice@example.com",
//       mobile: "555-555-5555",
//     },
//   ];

//   const handleViewDetail = (patient) => {
//     // Handle view detail action here
//     console.log("View detail for patient:", patient);
//     // You can add logic to display detailed information about the patient
//   };

//   let content = null;
//   if (patients.length === 0) content = <Empty />;
//   if (patients.length > 0)
//     content = (
//       <>
//         <table className="my-patients-table">
//           <thead>
//             <tr>
//               <th>Patient Name</th>
//               <th>Gender</th>
//               <th>Appointment Time</th>
//               <th>Address</th>
//               <th>Email</th>
//               <th>Mobile</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {patients.map((patient) => (
//               <tr key={patient.id}>
//                 <td>
//                   <Link to={"/"} className="patient-name">
//                     <h5>{patient.firstName + " " + patient.lastName}</h5>
//                   </Link>
//                 </td>
//                 <td>{patient.gender}</td>
//                 <td>{moment(patient.appointmentTime).format("MMM Do YY")}</td>
//                 <td>{patient.address}</td>
//                 <td>{patient.email}</td>
//                 <td>{patient.mobile}</td>
//                 <td>
//                   <Button
//                     type="primary"
//                     onClick={() => handleViewDetail(patient)}
//                   >
//                     View Detail
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </>
//     );
//   return (
//     <DashboardLayout>
//       <div className="row">
//         <div className="col-md-6 col-lg-4 col-xl-3">{content}</div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default MyPatients;

import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import "./MyPatients.css";
import { Link } from "react-router-dom";
import { Empty, Button, Select, Modal } from "antd";
import axios from "axios";

const { Option } = Select;

const MyPatients = () => {
  const [profileData, setProfileData] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/patient/");
        setProfileData(response.data);
        setFilteredPatients(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (value, type) => {
    if (type === "gender") {
      // Filter based on gender
      if (value === "All") {
        setFilteredPatients(profileData);
      } else {
        const filtered = profileData.filter(
          (patient) => patient.gender === value
        );
        setFilteredPatients(filtered);
      }
    } else if (type === "disease_type") {
      // Filter based on disease type
      if (value === "All") {
        setFilteredPatients(profileData);
      } else {
        const filtered = profileData.filter(
          (patient) => patient.disease_type === value
        );
        setFilteredPatients(filtered);
      }
    }
  };

  const handleViewDetail = (patient) => {
    setSelectedPatient(patient);
    setModalVisible(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-md-12">
          {filteredPatients.length === 0 ? (
            <Empty />
          ) : (
            <>
              <table className="my-patients-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>
                      <Select
                        defaultValue="All"
                        onChange={(value) =>
                          handleFilterChange(value, "gender")
                        }
                      >
                        <Option value="All">Gender</Option>
                        <Option value="M">Male</Option>
                        <Option value="F">Female</Option>
                      </Select>
                    </th>
                    <th>
                      <Select
                        defaultValue="All"
                        onChange={(value) =>
                          handleFilterChange(value, "disease_type")
                        }
                      >
                        <Option value="All">Disease Type</Option>
                        <Option value="Skin Disease">Skin Disease</Option>
                        <Option value="Eye Disease">Eye Disease</Option>
                      </Select>
                    </th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPatients.map((data) => (
                    <tr key={data.id}>
                      <td>
                        <Link to={"/"} className="patient-name">
                          {data.first_name + " " + data.last_name}
                        </Link>
                      </td>
                      <td>{data.gender}</td>
                      <td>{data.disease_type}</td>
                      <td>{data.city}</td>
                      <td>{data.email}</td>
                      <td>{data.phone_number}</td>
                      <td>
                        <Button
                          type="primary"
                          onClick={() => handleViewDetail(data)}
                        >
                          View Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        <Modal
          title="Patient Detail"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setModalVisible(false)}>
              Close
            </Button>,
            <Button key="print" type="primary" onClick={handlePrint}>
              Print
            </Button>,
          ]}
        >
          {selectedPatient && (
            <div>
              <p>
                Name: {selectedPatient.firstName} {selectedPatient.lastName}
              </p>
              <p>Gender: {selectedPatient.gender}</p>
              <p>Disease Type: {selectedPatient.disease_type}</p>
              <p>Address: {selectedPatient.city}</p>
              <p>Email: {selectedPatient.email}</p>
              <p>Mobile: {selectedPatient.phone_number}</p>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default MyPatients;
