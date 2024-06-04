import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import userImg from "../../../images/avatar.jpg";
import "./Dashboard.css";
import { Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { get } from "react-hook-form";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  // const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [clinicalRecords, setClinicalRecords] = useState([]);

  useEffect(() => {
    // Fetch doctors data
    axios
      .get("http://127.0.0.1:8000/specialist/")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors data:", error);
      });

    // Fetch patients data
    // axios
    //   .get("http://127.0.0.1:8000/patient/")
    //   .then((response) => {
    //     setPatients(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching patients data:", error);
    //   });

    // Fetch appointments data
    axios
      .get("http://127.0.0.1:8000/appointment/")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments data:", error);
      });

    // Fetch clinical records data
    axios
      .get("http://127.0.0.1:8000/clinical-record/")
      .then((response) => {
        setClinicalRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clinical records data:", error);
      });
  }, []);

  const getSpecialistName = (id) => {
    const specialist = doctors.find((doc) => doc.id === id);
    return specialist
      ? `${specialist.first_name} ${specialist.last_name}`
      : "Unknown";
  };

  const getPatientName = (id) => {
    const clinicalRecord = clinicalRecords.find((clinicalRecord) => clinicalRecord.id === id);
    return clinicalRecord ? `${clinicalRecord.patient.first_name} ${clinicalRecord.patient.last_name}` : "Unknown";
  };

  const getSpecialization = (id) => {
    const specialist = doctors.find((doc) => doc.id === id);
    return specialist && specialist.specialization
      ? specialist.specialization
      : "N/A";
  };

  const getDiseaseType = (id) => {
    const record = clinicalRecords.find((rec) => rec.id === id);
    return record ? record.disease_type : "Unknown";
  };

  const handleViewDetail = (appointment) => {
    alert(`Appointment Detail:
    Doctor: ${getSpecialistName(appointment.specialist)}
    Patient: ${getPatientName(appointment.clinicalRecord)}
    Date: ${new Date(appointment.appointment_date).toLocaleString()}
    Message: ${appointment.message}`);
  };

  return (
    <>
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
                    <h3>{doctors.length}</h3>
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
                    <h3>{clinicalRecords.length}</h3>
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
                  <div className="dash-count">
                    <h3>{appointments.length}</h3>
                  </div>
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
                  <div className="dash-count">
                    <h3>8</h3>
                  </div>
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
                              <a
                                href="profile.html"
                                className="avatar avatar-sm mr-2"
                              >
                                <img
                                  className="avatar-img rounded-circle"
                                  src={userImg}
                                  alt="Patient"
                                />
                              </a>
                              <a href="profile.html">
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
                          <td>{getDiseaseType(clinicalRecord.id)}</td>
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
                                  src={userImg}
                                  alt="Doctor"
                                />
                              </a>
                              <a href="profile.html">
                                {getSpecialistName(appointment.specialist)}
                              </a>
                            </h2>
                          </td>
                          <td>{getSpecialization(appointment.specialist)}</td>
                          <td>
                            <h2 className="table-avatar">
                              <a className="avatar avatar-sm mr-2">
                                <img
                                  className="avatar-img rounded-circle"
                                  src={userImg}
                                  alt="Patient"
                                />
                              </a>
                              <a href="profile.html">
                                {getPatientName(appointment.clinicalRecord)}


                                
                              </a>

                            </h2>
                          </td>

                          <td>
                            {new Date(
                              appointment.appointment_date
                            ).toLocaleDateString()}{" "}
                            <span className="text-primary d-block">
                              {new Date(
                                appointment.appointment_date
                              ).toLocaleTimeString()}
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
    </>
  );
};

export default AdminDashboard;
