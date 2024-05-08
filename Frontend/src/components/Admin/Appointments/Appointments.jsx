import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import "./Appointments.css";
import { Button } from "antd/es/radio";
import axios from "axios";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/appointment/");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <AdminLayout>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="datatable table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>Doctor Name</th>
                        <th>Speciality</th>
                        <th>Patient Name</th>
                        <th>Appointment Time</th>
                        <th>Status</th>
                        <th className="text-right">Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td>
                            <h2 className="table-avatar">
                              <a
                                href="profile.html"
                                className="avatar avatar-sm mr-2"
                              >
                                <img
                                  className="avatar-img rounded-circle"
                                  src="assets/img/doctors/doctor-thumb-01.jpg"
                                  alt=""
                                />
                              </a>
                              <a href="profile.html">
                                {appointment.doctor_name}
                              </a>
                            </h2>
                          </td>
                          <td>{appointment.speciality}</td>
                          <td>
                            <h2 className="table-avatar">
                              <a
                                href="profile.html"
                                className="avatar avatar-sm mr-2"
                              >
                                <img
                                  className="avatar-img rounded-circle"
                                  src="assets/img/patients/patient1.jpg"
                                  alt=""
                                />
                              </a>
                              <a href="profile.html">
                                {appointment.patient_name}
                              </a>
                            </h2>
                          </td>
                          <td>{appointment.appointment_time}</td>
                          <td>
                            <div className="status-toggle">
                              <input
                                type="checkbox"
                                id={`status_${appointment.id}`}
                                className="check"
                                checked={appointment.status}
                              />
                              <label
                                htmlFor={`status_${appointment.id}`}
                                className="checktoggle"
                              >
                                checkbox
                              </label>
                            </div>
                          </td>
                          <td className="text-right">
                            <Button className="see-more">see more</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminAppointments;
