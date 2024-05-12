import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import "./Patients.css";
import { Link } from "react-router-dom";
import { Empty, Button, Select, Modal } from "antd";
import axios from "axios";

const { Option } = Select;

const Patients = () => {
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
    <AdminLayout>
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
    </AdminLayout>
  );
};

export default Patients;
