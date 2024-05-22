import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewDetail.css"; // Import CSS file for custom styling
import { useParams } from "react-router-dom";

const ViewDetail = () => {
  const { id } = useParams(); // Get the appointment ID from the URL
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/appointment/detail/${id}`
        );
        setAppointmentData(response.data);
      } catch (error) {
        console.error("Error fetching appointment detail:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!appointmentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-detail-container">
      <div className="section">
        <h2>Patient Details</h2>
        <div className="patient-details">
          <p>
            Name: {appointmentData.clinical_record.patient.first_name}{" "}
            {appointmentData.clinical_record.patient.last_name}
          </p>
          <p>Age: {appointmentData.clinical_record.patient.age}</p>
          <p>Gender: {appointmentData.clinical_record.patient.gender}</p>
          <p>Email: {appointmentData.clinical_record.patient.email}</p>
          <p>
            Phone Number: {appointmentData.clinical_record.patient.phone_number}
          </p>
          <p>City: {appointmentData.clinical_record.patient.city}</p>
          <p>State: {appointmentData.clinical_record.patient.state}</p>
          <p>Country: {appointmentData.clinical_record.patient.country}</p>
        </div>
      </div>
      <div className="section">
        <h2>Clinical Record</h2>
        <div className="clinical-record">
          <div>
            <p>
              Family History: {appointmentData.clinical_record.family_history}
            </p>
            <p>Blood Type: {appointmentData.clinical_record.blood_type}</p>
            <p>
              Pregnancy Condition:{" "}
              {appointmentData.clinical_record.pregnancy_condition
                ? "Yes"
                : "No"}
            </p>
            <p>Symptoms: {appointmentData.clinical_record.symptoms}</p>
            <p>
              Symptoms Description:{" "}
              {appointmentData.clinical_record.symptoms_description}
            </p>
            <p>Disease Type: {appointmentData.clinical_record.disease_type}</p>
            <p>
              Disease Description:{" "}
              {appointmentData.clinical_record.disease_description}
            </p>
            <p>
              Follow-up Information:{" "}
              {appointmentData.clinical_record.follow_up_information}
            </p>
            <p>Allergies: {appointmentData.clinical_record.allergies}</p>
            <p>
              Vaccination Status:{" "}
              {appointmentData.clinical_record.vaccination_status}
            </p>
            <p>Sugar Level: {appointmentData.clinical_record.sugar_level}</p>
            <p>
              Blood Pressure: {appointmentData.clinical_record.blood_pressure}
            </p>
            <p>Message: {appointmentData.clinical_record.message}</p>
          </div>
        </div>
      </div>

      {/* <div className="section">
        <h2>Specialist Details</h2>
        <div className="specialist-details">
          <p>
            Name: {appointmentData.specialist.first_name}{" "}
            {appointmentData.specialist.last_name}
          </p>
          <p>Email: {appointmentData.specialist.email}</p>
          <p>Gender: {appointmentData.specialist.gender}</p>
          <p>About Me: {appointmentData.specialist.about_me}</p>
          <p>Service: {appointmentData.specialist.service}</p>
          <p>Specialization: {appointmentData.specialist.specialization}</p>
          <p>
            License Verified:{" "}
            {appointmentData.specialist.is_license_verified ? "Yes" : "No"}
          </p>
          <p>Clinic Name: {appointmentData.specialist.clinic_name}</p>
          <p>Clinic Address: {appointmentData.specialist.clinic_address}</p>
          <p>City: {appointmentData.specialist.city}</p>
          <p>State: {appointmentData.specialist.state}</p>
          <p>Country: {appointmentData.specialist.country}</p>
        </div>
      </div> */}
      <div className="section">
        <h2>Appointment Details</h2>
        <div className="appointment-details">
          <p>
            Date: {new Date(appointmentData.appointment_date).toLocaleString()}
          </p>
          <p>Message: {appointmentData.message}</p>
          <p>Status: {appointmentData.status ? "Active" : "Inactive"}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;
