import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./DoctorsList.css";

const DoctorsList = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctorsData = [
    {
      first_name: "John",
      last_name: "Doe",
      email: "tesfau@gmil.com"
      // other fields...
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      // other fields...
    },
    {
      first_name: "David",
      last_name: "Brown",
      // other fields...
    },
  ];

  const openDetailsPopup = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const closeDetailsPopup = () => {
    setSelectedDoctor(null);
  };

  return (
    <div className="doctors-container">
      {doctorsData.map((doctor) => (
        <div key={doctor.username} className="doctor-card">
          <div className="basic-details">
            <div className="profile-image">
              <img src={doctor.profile_picture} alt={doctor.username} />
            </div>
            <div className="info">
              <h3>
                {doctor.first_name} {doctor.last_name}
              </h3>
              <p>Specialization: {doctor.specialization}</p>
              <p>Address: {doctor.clinic_address}</p>
              <p>City: {doctor.city}</p>
              <p>Experience: {doctor.experience} years</p>
            </div>
          </div>
          <div className="doctor-actions">
            <button className="view_detail"onClick={() => openDetailsPopup(doctor)}>
              View Details
            </button>
            <Link to="/calendly">
              <button className="appointment-btn">Make Appointment</button>
            </Link>
          </div>
        </div>
      ))}

      {/* Popup component */}
      {selectedDoctor && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closeDetailsPopup}>
              &times;
            </span>
            <div className="popup-details">
              <div className="profile-image">
                <img
                  src={selectedDoctor.profile_picture}
                  alt={selectedDoctor.username}
                />
              </div>
              <div className="doctor-info">
                <h3>
                  {selectedDoctor.first_name} {selectedDoctor.last_name}
                </h3>
                <p>Email: {selectedDoctor.email}</p>
                <p>Phone: {selectedDoctor.phone}</p>
                <p>Date of Birth: {selectedDoctor.date_of_birth}</p>
                <p>Gender: {selectedDoctor.gender}</p>
                <p>About Me: {selectedDoctor.about_me}</p>
                <p>Service: {selectedDoctor.service}</p>
                <p>Specialization: {selectedDoctor.specialization}</p>
                <p>
                  License Verified:{" "}
                  {selectedDoctor.is_license_verified ? "Yes" : "No"}
                </p>
                <p>Clinic Name: {selectedDoctor.clinic_name}</p>
                <p>
                  Full Address: {selectedDoctor.clinic_address},{" "}
                  {selectedDoctor.city}, {selectedDoctor.state},{" "}
                  {selectedDoctor.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
