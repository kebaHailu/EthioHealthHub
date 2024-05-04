import React, { useState } from "react";
import AdminLayout from "../AdminLayout/AdminLayout";

import "./Patients.css";
import { Link } from "react-router-dom";
import {
  FaClock,
  FaEnvelope,
  FaLocationArrow,
  FaPhoneAlt,
} from "react-icons/fa";
import { Empty, Button, Select, Modal } from "antd";

const { Option } = Select;

const Patients = () => {
  // Sample patient data
  const patients = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      diseaseType: "Skin Disease",
      address: "123 Main St",
      email: "john@example.com",
      mobile: "123-456-7890",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      gender: "Female",
      diseaseType: "Eye Disease",
      address: "456 Elm St",
      email: "jane@example.com",
      mobile: "987-654-3210",
    },
    {
      id: 3,
      firstName: "Alice",
      lastName: "Johnson",
      gender: "Female",
      diseaseType: "Skin Disease",
      address: "789 Oak St",
      email: "alice@example.com",
      mobile: "555-555-5555",
    },
  ];

  const [filteredPatients, setFilteredPatients] = useState([...patients]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleFilterChange = (value) => {
    if (value === "All") {
      setFilteredPatients([...patients]);
    } else {
      const filtered = patients.filter(
        (patient) => patient.diseaseType === value
      );
      setFilteredPatients([...filtered]);
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
    <AdminLayout>
      <div className="row">
        <div className="col-md-6 col-lg-4 col-xl-3">
          {filteredPatients.length === 0 ? (
            <Empty />
          ) : (
            <>
              <table className="my-patients-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Gender</th>
                    <th>
                      <Select defaultValue="All" onChange={handleFilterChange}>
                        <Option value="All">diease Type</Option>
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
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td>
                        <Link to={"/"} className="patient-name">
                          <h5>{patient.firstName + " " + patient.lastName}</h5>
                        </Link>
                      </td>
                      <td>{patient.gender}</td>
                      <td>{patient.diseaseType}</td>
                      <td>{patient.address}</td>
                      <td>{patient.email}</td>
                      <td>{patient.mobile}</td>
                      <td>
                        <Button
                          type="primary"
                          onClick={() => handleViewDetail(patient)}
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
              <p>Disease Type: {selectedPatient.diseaseType}</p>
              <p>Address: {selectedPatient.address}</p>
              <p>Email: {selectedPatient.email}</p>
              <p>Mobile: {selectedPatient.mobile}</p>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default Patients;
