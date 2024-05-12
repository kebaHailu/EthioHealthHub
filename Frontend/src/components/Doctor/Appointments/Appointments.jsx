import React, { useEffect } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import img from "../../../images/doc/doctor 3.jpg";
import "./Appointments.css";
import moment from "moment";
import { Button, Empty, message, Tag, Tooltip } from "antd";
import {
  FaEye,
  FaCheck,
  FaTimes,
  FaClock,
  FaEnvelope,
  FaLocationArrow,
  FaPhoneAlt,
  FaBriefcaseMedical,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { clickToCopyClipBoard } from "../../../utils/copyClipBoard";

const Appointments = () => {
  const appointments = [
    {
      id: 1,
      patientName: "John Doe",
      date: "2024-05-04",
      time: "10:00 AM",
      gender: "Male",
      stationName: "Station 1",
      technicianName: "Dr. Smith",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      date: "2024-05-05",
      time: "11:30 AM",
      gender: "Female",
      stationName: "Station 2",
      technicianName: "Dr. Johnson",
    },
    {
      id: 3,
      patientName: "Alice Johnson",
      date: "2024-05-06",
      time: "02:00 PM",
      gender: "Female",
      stationName: "Station 3",
      technicianName: "Dr. Brown",
    },
  ];

  return (
    <DashboardLayout>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Appointment Date & Time</th>
            <th>Gender</th>
            <th>Station Name</th>
            <th>Technician Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patientName}</td>
              <td>
                {moment(appointment.date).format("MMM Do YY")}{" "}
                {appointment.time}
              </td>
              <td>{appointment.gender}</td>
              <td>{appointment.stationName}</td>
              <td>{appointment.technicianName}</td>
              <td>
                <Link to={`/dashboard/appointments/${appointment.id}`}>
                  <Button type="primary" icon={<FaEye />} size="small">
                    View
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default Appointments;
