import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import "./Specialites.css";
import { Empty, Button, Select, Modal } from "antd";
import axios from "axios";

const { Option } = Select;

const Specialites = () => {
  const [profileData, setProfileData] = useState([]);
  const [filteredSpecialists, setFilteredSpecialists] = useState([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/specialist/");
        const data = response.data;
        setProfileData(data);
        setFilteredSpecialists(data); // Ensure filteredSpecialists is set with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (value, type) => {
    let filteredData = profileData;

    // Filter by specialization
    if (type === "specialization") {
      if (value !== "All") {
        filteredData = profileData.filter(
          (data) => data.specialization === value
        );
      }
    }

    // Filter by gender
    if (type === "gender") {
      if (value !== "All") {
        filteredData = profileData.filter(
          (data) => data.gender.toLowerCase() === value.toLowerCase()
        );
      }
    }

    setFilteredSpecialists(filteredData);
  };

  const handleViewDetail = (data) => {
    setSelectedSpecialist(data);
    setModalVisible(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AdminLayout>
      <div className="row">
        <div className="col-md-6 col-lg-4 col-xl-3">
          {filteredSpecialists.length === 0 ? (
            <Empty />
          ) : (
            <>
              <table className="my-specialists-table">
                <thead>
                  <tr>
                    <th>Specialist Name</th>
                    <th>
                      <Select
                        defaultValue="All"
                        onChange={(value) =>
                          handleFilterChange(value, "specialization")
                        }
                      >
                        <Option value="All">All Specializations</Option>
                        <Option value="Dermatologist">Dermatologist</Option>
                        <Option value="Ophthalmologist">Ophthalmologist</Option>
                      </Select>
                    </th>
                    <th>
                      <Select
                        defaultValue="All"
                        onChange={(value) =>
                          handleFilterChange(value, "gender")
                        }
                      >
                        <Option value="All">All Genders</Option>
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                      </Select>
                    </th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Verified</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSpecialists.map((data) => (
                    <tr key={data.id}>
                      <td>{data.first_name + " " + data.last_name}</td>
                      <td>{data.specialization}</td>
                      <td>{data.gender}</td>
                      <td>{data.email}</td>
                      <td>{data.phone}</td>
                      <td>{data.isVerified ? "Yes" : "No"}</td>
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
              {/* <div className="print-button-container">
                {selectedSpecialist && (
                  <Button type="primary" onClick={handlePrint}>
                    Print
                  </Button>
                )}
              </div> */}
            </>
          )}
        </div>
        <Modal
          title="Specialist Detail"
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
          {selectedSpecialist && (
            <div>
              <p>
                Name: {selectedSpecialist.first_name}{" "}
                {selectedSpecialist.last_name}
              </p>
              <p>Email: {selectedSpecialist.email}</p>
              <p>Phone: {selectedSpecialist.phone}</p>
              <p>Date of Birth: {selectedSpecialist.date_of_birth}</p>
              <p>Gender: {selectedSpecialist.gender}</p>
              <p>About Me: {selectedSpecialist.about_me}</p>
              <p>Clinic Name: {selectedSpecialist.clinic_name}</p>
              <p>Clinic Address: {selectedSpecialist.clinic_address}</p>
              <p>Service: {selectedSpecialist.service}</p>
              <p>Specialization: {selectedSpecialist.specialization}</p>
              <p>License Number: {selectedSpecialist.license_number}</p>
              <p>Address Line: {selectedSpecialist.address_line}</p>
              <p>City: {selectedSpecialist.city}</p>
              <p>State: {selectedSpecialist.state}</p>
              <p>Country: {selectedSpecialist.country}</p>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default Specialites;
