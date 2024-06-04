import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AppointmentPage.css"; // Import custom styles
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Fixed import
import { toast } from "react-toastify";
import { Select } from "antd";
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';

function AppointmentPage() {
  const [, setLoading] = useState(false);

  const [profileData, setProfileData] = useState([]);
  const Token = localStorage.getItem("accessToken");
  const user = Token ? jwtDecode(Token) : null;
  const technicianId = user?.user_id; // Get technician ID from token

  const location = useLocation();
  const { doctorIdK } = location.state || {}; // Retrieve specialistId from location state

  const [formData, setFormData] = useState({
    appointment_date: null,
    message: "",
    status: false,
    clinical_record: "", // Add patient field to formData
  });

  const [error, setError] = useState("");

  const specialistId = doctorIdK;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/clinical-record/"
        );
        const data = response.data;
        setProfileData(data);
        console.log(data);
      } catch (error) {
        console.error("There was a problem fetching the data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const toastId = toast.loading("Creating Appointment...");

    try {
      if (
        !formData.appointment_date ||
        !formData.message
        // !formData.clinical_record
      ) {
        setError("All fields are required.");
        setLoading(false);
        return;
      }
      // formData.technician = technicianId;
      // formData.specialist = specialistId;

      const postData = {
        clinical_record: formData.clinical_record,
        // patient: formData.patient, // Use formData.patient as patientId
        // technician: technicianId, // Use the technicianId from the token
        specialist: specialistId, // Use the specialistId retrieved from location state
        appointment_date: formData.appointment_date,
        message: formData.message,
        status: formData.status,
      };
      console.log(postData);
      const token= localStorage.getItem("accessToken");

      const response = await axios.post(
        "http://127.0.0.1:8000/appointment/",
        postData,
        {
          headers: {
            Authorization: `JWT ${Token}`,
          },
        }

      );
      console.log(response);
      if (response.status === 201) {
        toast.success("Appointment created successfully");
        toast.dismiss(toastId);
        setFormData({
          appointment_date: null,
          message: "",
          // status: false,
          technician: "",
          specialist: "",
        });
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      setError("An error occurred while creating the appointment.");
      toast.error("An error has occurred. Please try again later.");
      toast.dismiss(toastId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className ='headerapp'>
        <Header />
      </div>
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Create Appointment</h2>
        <form onSubmit={handleSubmit} className="appointment-form">
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="form-group">
            <label>Select clinical record:</label>
            <Select
              placeholder="Select clinical record for your patient"
              value={formData.clinical_record}
              onChange={(value) =>
                setFormData({ ...formData, clinical_record: value })
              }
            >
              {profileData.map((profile) => (
                <Select.Option key={profile.id} value={profile.id}>
                  {profile.patient.first_name} {profile.patient.last_name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="form-group">
            <label>Date and Time:</label>
            <input
              type="datetime-local"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          {/* <div className="form-group">
          <label>Status:</label>
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
        </div> */}
          <button type="submit" className="btn btn-primary">
            Make Appointment
          </button>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default AppointmentPage;
