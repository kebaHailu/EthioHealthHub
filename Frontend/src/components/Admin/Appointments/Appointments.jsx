import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import { jwtDecode } from "jwt-decode";
import "./Appointments.css";

import axios from "axios";

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

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");
  // const token = "eyJ0eXAiO.../// jwt token";
  const decoded = jwtDecode(token);

  console.log(decoded.user_id);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(
        `http://127.0.0.1:8000/appointments/station/${decoded.user_id}`,

        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      )
      .then((response) => {
        setAppointments(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the appointments!", error);
        message.error("Failed to load appointments");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AdminLayout>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Specialist Name</th>
            <th>Specialization Area</th>
            <th>Patient Name</th>

            <th>Gender</th>
            {/* <th>Station Name</th> */}
            <th>Technician Name</th>

            <th>Appointment Date & Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>
                  {`${appointment.specialist_first_name} ${appointment.specialist_last_name}`.trim()}
                </td>

                <td>{appointment.specialization}</td>

                <td>{appointment.patient_name}</td>

                <td>{appointment.gender}</td>

                <td>
                  {`${appointment.technician_first_name} ${appointment.technician_last_name}`.trim()}
                </td>
                <td>
                  {moment(appointment.appointment_date).format("MMM Do YY")}{" "}
                  {moment(appointment.appointment_date).format("h:mm A")}
                </td>
                <td>
                  <Link to={`/admin/appointments/${appointment.id}`}>
                    <Button type="primary" icon={<FaEye />} size="small">
                      View
                    </Button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">
                <Empty description="No Appointments" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default AdminAppointments;
