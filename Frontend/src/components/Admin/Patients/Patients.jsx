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
          const response = await axios.get(
            "http://127.0.0.1:8000/clinical-record/"
          );
          setProfileData(response.data);
          setFilteredPatients(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);

    const handleFilterChange = (value, type) => {
      let filtered;
      if (type === "gender") {
        // Filter based on gender
        filtered =
          value === "All"
            ? profileData
            : profileData.filter((patient) => patient.patient.gender === value);
      } else if (type === "disease_type") {
        // Filter based on disease type
        filtered =
          value === "All"
            ? profileData
            : profileData.filter((data) => data.disease_type === value);
      }
      setFilteredPatients(filtered);
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
                        <Option value="S">Skin Disease</Option>
                        <Option value="E">Eye Disease</Option>
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
                        {data.patient.first_name + " " + data.patient.last_name}
                      </td>
                      <td>{data.patient.gender}</td>
                      <td>{data.disease_type}</td>
                      <td>{data.patient.city}</td>
                      <td>{data.patient.email}</td>
                      <td>{data.patient.phone_number}</td>
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
                Name: {selectedPatient.patient.first_name}{" "}
                {selectedPatient.patient.last_name}
              </p>
              <p>Gender: {selectedPatient.patient.gender}</p>
              <p>Disease Type: {selectedPatient.disease_type}</p>
              <p>Address: {selectedPatient.patient.city}</p>
              <p>Email: {selectedPatient.patient.email}</p>
              <p>Mobile: {selectedPatient.patient.phone_number}</p>

              <p>Family_history: {selectedPatient.family_history}</p>
              <p>Blood_type: {selectedPatient.blood_type}</p>
              <p>Pregnancy_condition: {selectedPatient.pregnancy_condition}</p>
              <p>Symptoms: {selectedPatient.symptoms}</p>
              <p>
                Symptoms_description: {selectedPatient.symptoms_description}
              </p>
              <p>Disease_description: {selectedPatient.disease_description}</p>
              <p>
                Follow_up_information: {selectedPatient.follow_up_information}
              </p>
              <p>Image_path: {selectedPatient.image_path}</p>
              <p>Allergies: {selectedPatient.allergies}</p>
              <p>Vaccination_status: {selectedPatient.vaccination_status}</p>
              <p>Sugar_level: {selectedPatient.sugar_level}</p>
              <p>Blood_pressure: {selectedPatient.blood_pressure}</p>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default Patients;
