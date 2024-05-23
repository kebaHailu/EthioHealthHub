import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DoctorsList.css";

const DoctorsList = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/specialist/");
        setDoctorsData(response.data);
      } catch (error) {
        console.error("Error fetching doctors data:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleMakeAppointment = (specialistId) => {
    navigate("/appointment", { state: { doctorIdK: specialistId } });
  };

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
              <p>
                <strong>email:</strong> {doctor.email}
              </p>
              <p>
                <strong>Specialization:</strong> {doctor.specialization}
              </p>
              <p>
                <strong>Address:</strong> {doctor.clinic_address}
              </p>
              <p>
                <strong>Experience: </strong>
                {doctor.experience} years
              </p>
            </div>
          </div>
          <div className="doctor-actions">
            <button
              className="view_detail"
              onClick={() => openDetailsPopup(doctor)}
            >
              View Details
            </button>
            <button
              className="appointment-btn"
              onClick={() => handleMakeAppointment(doctor.id)}
            >
              Make Appointment
            </button>
          </div>
        </div>
      ))}

      {selectedDoctor && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closeDetailsPopup}>
              &times;
            </span>
            <div className="popup-details">
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
