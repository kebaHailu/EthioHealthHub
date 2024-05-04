import React from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import moment from "moment";
import './MyPatients.css'
import { Link } from "react-router-dom";
import {
  FaClock,
  FaEnvelope,
  FaLocationArrow,
  FaPhoneAlt,
} from "react-icons/fa";
import { Empty, Button } from "antd";

const MyPatients = () => {
  // Sample patient data
  const patients = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      appointmentTime: "2024-05-04",
      address: "123 Main St",
      email: "john@example.com",
      mobile: "123-456-7890",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      gender: "Female",
      appointmentTime: "2024-05-05",
      address: "456 Elm St",
      email: "jane@example.com",
      mobile: "987-654-3210",
    },
    {
      id: 3,
      firstName: "Alice",
      lastName: "Johnson",
      gender: "Female",
      appointmentTime: "2024-05-06",
      address: "789 Oak St",
      email: "alice@example.com",
      mobile: "555-555-5555",
    },
  ];

  const handleViewDetail = (patient) => {
    // Handle view detail action here
    console.log("View detail for patient:", patient);
    // You can add logic to display detailed information about the patient
  };

  let content = null;
  if (patients.length === 0) content = <Empty />;
  if (patients.length > 0)
    content = (
      <>
        <table className="my-patients-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Gender</th>
              <th>Appointment Time</th>
              <th>Address</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>
                  <Link to={"/"} className="patient-name">
                    <h5>{patient.firstName + " " + patient.lastName}</h5>
                  </Link>
                </td>
                <td>{patient.gender}</td>
                <td>{moment(patient.appointmentTime).format("MMM Do YY")}</td>
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
    );
  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-md-6 col-lg-4 col-xl-3">{content}</div>
      </div>
    </DashboardLayout>
  );
};

export default MyPatients;
