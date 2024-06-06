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
      <div className="view-detail-flex">
        <div className="view-detail-section">
          <h2>Patient Details</h2>
          <table className="view-detail-table">
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{`${appointmentData.clinical_record.patient.first_name} ${appointmentData.clinical_record.patient.last_name}`}</td>
              </tr>
              <tr>
                <td>Age:</td>
                <td>{appointmentData.clinical_record.patient.age}</td>
              </tr>
              <tr>
                <td>Gender:</td>
                <td>{appointmentData.clinical_record.patient.gender}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{appointmentData.clinical_record.patient.email}</td>
              </tr>
              <tr>
                <td>Phone Number:</td>
                <td>{appointmentData.clinical_record.patient.phone_number}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{appointmentData.clinical_record.patient.city}</td>
              </tr>
              <tr>
                <td>State:</td>
                <td>{appointmentData.clinical_record.patient.state}</td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>{appointmentData.clinical_record.patient.country}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="view-detail-section">
          <h2>Clinical Record</h2>
          <table className="view-detail-table">
            <tbody>
              <tr>
                <td>Family History:</td>
                <td>{appointmentData.clinical_record.family_history}</td>
              </tr>
              <tr>
                <td>Blood Type:</td>
                <td>{appointmentData.clinical_record.blood_type}</td>
              </tr>
              <tr>
                <td>Pregnancy Condition:</td>
                <td>
                  {appointmentData.clinical_record.pregnancy_condition
                    ? "Yes"
                    : "No"}
                </td>
              </tr>
              <tr>
                <td>Symptoms:</td>
                <td>{appointmentData.clinical_record.symptoms}</td>
              </tr>
              <tr>
                <td>Symptoms Description:</td>
                <td>{appointmentData.clinical_record.symptoms_description}</td>
              </tr>
              <tr>
                <td>Disease Type:</td>
                <td>{appointmentData.clinical_record.disease_type}</td>
              </tr>
              <tr>
                <td>Disease Description:</td>
                <td>{appointmentData.clinical_record.disease_description}</td>
              </tr>
              <tr>
                <td>Follow-up Information:</td>
                <td>{appointmentData.clinical_record.follow_up_information}</td>
              </tr>
              <tr>
                <td>Allergies:</td>
                <td>{appointmentData.clinical_record.allergies}</td>
              </tr>
              <tr>
                <td>Vaccination Status:</td>
                <td>{appointmentData.clinical_record.vaccination_status}</td>
              </tr>
              <tr>
                <td>Sugar Level:</td>
                <td>{appointmentData.clinical_record.sugar_level}</td>
              </tr>
              <tr>
                <td>Blood Pressure:</td>
                <td>{appointmentData.clinical_record.blood_pressure}</td>
              </tr>
              <tr>
                <td>Message:</td>
                <td>{appointmentData.clinical_record.message}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="view-detail-section">
        <h2>Appointment Details</h2>
        <table className="view-detail-table">
          <tbody>
            <tr>
              <td>Date:</td>
              <td>
                {new Date(appointmentData.appointment_date).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>Message:</td>
              <td>{appointmentData.message}</td>
            </tr>
            <tr>
              <td>Machine learning result:</td>
              <td>
                {appointmentData.machine_learning_data.map((item, index) => (
                  <span key={index}>
                    {item}
                    {index < appointmentData.machine_learning_data.length - 1 &&
                      ", "}
                    <br />
                  </span>
                ))}
              </td>
            </tr>

            <tr>
              <td>Status:</td>
              <td>{appointmentData.status ? "Active" : "Inactive"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDetail;
