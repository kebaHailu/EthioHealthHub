import React, { useState } from "react";
import axios from "axios";
import "./AppointmentForm.css"; // Import custom styles
import { useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Fixed import
import { toast } from "react-toastify";

function AppointmentForm() {
  const [, setLoading] = useState(false);
  const token = localStorage.getItem("accessToken");
  const technician = token ? jwtDecode(token) : null;
  const location = useLocation();
//   const { doctorIdK } = location.state;
  const [formData, setFormData] = useState({
    appointment_date: null,
    message: "",
    status: false,
  });
  const user = token ? jwtDecode(token) : null; // Assuming user info is decoded from token
  const patientId = user?.user_id;
  const technicianId = technician?.user_id;
//   const specialistId = doctorIdK;
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const toastId = toast.loading("Creating Appointment...");

    try {
      if (!formData.appointment_date || !formData.message) {
        setError("All fields are required.");
        return;
      }

      if (!patientId) {
        setError("Patient ID is missing.");
        return;
      }

      const postData = {
        clinical_record: patientId,
        technician: technicianId,
        specialist: specialistId,
        appointment_date: formData.appointment_date,
        message: formData.message,
        status: formData.status,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/appointment/",
        postData
      );

      if (response.status === 201) {
        toast.success("Appointment created successfully");
        toast.dismiss(toastId);
        setFormData({
          appointment_date: null,
          message: "",
          status: false,
        });
      }
    } catch (error) {
      console.log("Error creating appointment:", error);
      setError("An error occurred while creating the appointment.");
      toast.error("An error has occurred. Please try again later.");
      toast.dismiss(toastId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <h2>Create Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group">
          <label>Date and Time:</label>
          <input
            type="datetime-local"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Appointment
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;
