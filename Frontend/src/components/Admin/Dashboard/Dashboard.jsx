import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import userImg from "../../../images/avatar.jpg";
import "./Dashboard.css";
import { Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import moment from "moment";

const AdminDashboard = () => {
  const token = localStorage.getItem("accessToken");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [clinicalRecords, setClinicalRecords] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    total_specialist: 0,
    total_patients: 0,
    total_appointments: 0,
    total_stations: 0,
  });

  const decoded = jwtDecode(token);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    axios
      .get("http://127.0.0.1:8000/technician/dashboard", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("http://127.0.0.1:8000/specialist/")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors data:", error);
      });

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
      })
      .catch((error) => {
        console.error("Error fetching appointments data:", error);
      });

    axios
      .get("http://127.0.0.1:8000/clinical_record/technician")
      .then((response) => {
        setClinicalRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clinical records data:", error);
      });
  }, [decoded.user_id]);

  const handleViewDetail = (appointment) => {
    alert(`Appointment Detail:
    Doctor: ${appointment.specialist_first_name} ${
      appointment.specialist_last_name
    }
    Specialization: ${appointment.specialization}
    Patient: ${appointment.patient_name}
    Gender: ${appointment.gender}
    Technician: ${appointment.technician_first_name} ${
      appointment.technician_last_name
    }
    Date: ${moment(appointment.appointment_date).format("MMM Do YY")} ${moment(
      appointment.appointment_date
    ).format("h:mm A")}`);
  };

  return (
    <AdminLayout>
      {/* Dashboard Widgets */}
      <div className="row">
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-body">
              <div className="dash-widget-header">
                <span className="dash-widget-icon text-primary border-primary">
                  <i className="fe fe-users"></i>
                </span>
                <div className="dash-count">
                  <div className="dash-count">
                    <h3>{dashboardData.total_specialist}</h3>
                  </div>
                </div>
              </div>
              <div className="dash-widget-info">
                <h6 className="text-muted">Doctors</h6>
                <div className="progress progress-sm">
                  <div className="progress-bar bg-primary w-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-body">
              <div className="dash-widget-header">
                <span className="dash-widget-icon text-success">
                  <i className="fe fe-credit-card"></i>
                </span>
                <div className="dash-count">
                  <div className="dash-count">
                    <h3>{dashboardData.total_patients}</h3>
                  </div>
                </div>
              </div>
              <div className="dash-widget-info">
                <h6 className="text-muted">Patients</h6>
                <div className="progress progress-sm">
                  <div className="progress-bar bg-success w-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-body">
              <div className="dash-widget-header">
                <span className="dash-widget-icon text-danger border-danger">
                  <i className="fe fe-money"></i>
                </span>
                <h3>{dashboardData.total_appointments}</h3>
              </div>
              <div className="dash-widget-info">
                <h6 className="text-muted">Appointments</h6>
                <div className="progress progress-sm">
                  <div className="progress-bar bg-danger w-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-body">
              <div className="dash-widget-header">
                <span className="dash-widget-icon text-warning border-warning">
                  <i className="fe fe-folder"></i>
                </span>
                <h3>{dashboardData.total_stations}</h3>
              </div>
              <div className="dash-widget-info">
                <h6 className="text-muted">Stations</h6>
                <div className="progress progress-sm">
                  <div className="progress-bar bg-warning w-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors and Patients Tables */}
      <div className="row">
        <div className="col-md-6 d-flex">
          <div className="card card-table flex-fill">
            <div className="card-header">
              <h4 className="card-title">Doctors List</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-center mb-0">
                  <thead>
                    <tr>
                      <th>Doctor Name</th>
                      <th>Speciality</th>
                      <th>Gender</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor) => (
                      <tr key={doctor.id}>
                        <td>
                          <h2 className="table-avatar">
                            <a className="avatar avatar-sm mr-2">
                              <img
                                className="avatar-img rounded-circle"
                                src={doctor.profile_picture || userImg}
                                alt="Doctor"
                              />
                            </a>
                            <a>
                              Dr. {doctor.first_name} {doctor.last_name}
                            </a>
                          </h2>
                        </td>
                        <td>{doctor.specialization || "N/A"}</td>
                        <td>{doctor.gender}</td>
                        <td>
                          <EditOutlined className="mr-2" />
                          <DeleteOutlined />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 d-flex">
          <div className="card card-table flex-fill">
            <div className="card-header">
              <h4 className="card-title">Patients List</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-center mb-0">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Phone</th>
                      <th>Last Visit</th>
                      <th>Disease Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clinicalRecords.map((clinicalRecord) => (
                      <tr key={clinicalRecord.id}>
                        <td>
                          <h2 className="table-avatar">
                            <a className="avatar avatar-sm mr-2">
                              <img
                                className="avatar-img rounded-circle"
                                src={userImg}
                                alt="Patient"
                              />
                            </a>
                            <a>
                              {clinicalRecord.patient.first_name}{" "}
                              {clinicalRecord.patient.last_name}
                            </a>
                          </h2>
                        </td>
                        <td>{clinicalRecord.patient.phone_number}</td>
                        <td>
                          {new Date(
                            clinicalRecord.patient.created_at
                          ).toLocaleDateString()}
                        </td>
                        <td>{clinicalRecord.disease_type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="row">
        <div className="col-md-12">
          <div className="card card-table">
            <div className="card-header">
              <h4 className="card-title">Appointment List</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-center mb-0">
                  <thead>
                    <tr>
                      <th>Doctor Name</th>
                      <th>Speciality</th>
                      <th>Patient Name</th>
                      <th> Patient Gender</th>
                      {/* <th>Technician Name</th> */}
                      <th>Appointment Time</th>
                      <th>Status</th>
                      <th className="text-right">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>
                          {`${appointment.specialist_first_name} ${appointment.specialist_last_name}`.trim()}
                        </td>
                        <td>{appointment.specialization}</td>
                        <td>{appointment.patient_name}</td>
                        <td>{appointment.gender}</td>
                        {/* <td>
                          {`${appointment.technician_first_name} ${appointment.technician_last_name}`.trim()}
                        </td> */}
                        <td>
                          {moment(appointment.appointment_date).format(
                            "MMM Do YY"
                          )}{" "}
                          <span className="text-primary d-block">
                            {moment(appointment.appointment_date).format(
                              "h:mm A"
                            )}
                          </span>
                        </td>
                        <td>
                          <div className="status-toggle">
                            <input
                              type="checkbox"
                              id={`status_${appointment.id}`}
                              className="check"
                              defaultChecked
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
                          <Button
                            className="see-more"
                            onClick={() => handleViewDetail(appointment)}
                          >
                            see more
                          </Button>
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
  );
};

export default AdminDashboard;
