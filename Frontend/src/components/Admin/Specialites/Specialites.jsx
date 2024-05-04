import React, { useState } from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import "./Specialites.css";
import { Link } from "react-router-dom";
import { Empty, Button, Select, Modal } from "antd";

const { Option } = Select;

const Specialites = () => {
  // Sample specialist data
  const specialists = [
    {
      id: 1,
      name: "Dr. John Doe",
      specialization: "Dermatologist",
      gender: "Male",
      email: "john@example.com",
      phone: "123-456-7890",
      isVerified: true,
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      specialization: "Ophthalmologist",
      gender: "Female",
      email: "jane@example.com",
      phone: "987-654-3210",
      isVerified: false,
    },
    {
      id: 3,
      name: "Dr. Alice Johnson",
      specialization: "Dermatologist",
      gender: "Female",
      email: "alice@example.com",
      phone: "555-555-5555",
      isVerified: true,
    },
  ];

  const [filteredSpecialists, setFilteredSpecialists] = useState([
    ...specialists,
  ]);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleFilterChange = (value) => {
    if (value === "All") {
      setFilteredSpecialists([...specialists]);
    } else {
      const filtered = specialists.filter(
        (specialist) => specialist.specialization === value
      );
      setFilteredSpecialists([...filtered]);
    }
  };

  const handleGenderFilterChange = (value) => {
    if (value === "All") {
      setFilteredSpecialists([...specialists]);
    } else {
      const filtered = specialists.filter(
        (specialist) => specialist.gender === value
      );
      setFilteredSpecialists([...filtered]);
    }
  };

  const handleViewDetail = (specialist) => {
    setSelectedSpecialist(specialist);
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
                   
                      <Select defaultValue="All" onChange={handleFilterChange}>
                        <Option value="All">All Specializations</Option>
                        <Option value="Dermatologist">Dermatologist</Option>
                        <Option value="Ophthalmologist">Ophthalmologist</Option>
                      </Select>
                    </th>
                    <th>
                      <Select
                        defaultValue="All"
                        onChange={handleGenderFilterChange}
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
                  {filteredSpecialists.map((specialist) => (
                    <tr key={specialist.id}>
                      <td>
                        <h5>{specialist.name}</h5>
                      </td>
                      <td>{specialist.specialization}</td>
                      <td>{specialist.gender}</td>
                      <td>{specialist.email}</td>
                      <td>{specialist.phone}</td>
                      <td>{specialist.isVerified ? "Yes" : "No"}</td>
                      <td>
                        <Button
                          type="primary"
                          onClick={() => handleViewDetail(specialist)}
                        >
                          View Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="print-button-container">
                {selectedSpecialist && (
                  <Button type="primary" onClick={handlePrint}>
                    Print
                  </Button>
                )}
              </div>
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
              <p>Name: {selectedSpecialist.name}</p>
              <p>Specialization: {selectedSpecialist.specialization}</p>
              <p>Gender: {selectedSpecialist.gender}</p>
              <p>Email: {selectedSpecialist.email}</p>
              <p>Phone: {selectedSpecialist.phone}</p>
              <p>Verified: {selectedSpecialist.isVerified ? "Yes" : "No"}</p>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default Specialites;
