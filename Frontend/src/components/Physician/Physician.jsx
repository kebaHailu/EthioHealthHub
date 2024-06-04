import React, { useState, useEffect } from "react";
import { message } from "antd";

import axios from "axios";
import "./physician.css";

const Physician = () => {
  const [data, setData] = useState(null); // Change initial state to null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState({});
  const [decision, setDecision] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/clinical-record/5/"
        );
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = () => {
    console.log("Message:", decision);
    message.success("Data saved successfully!");
    // Implement the logic to save the data (comments and message)
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }
  const handlePrevious = () => {
    window.history.back();
  };

  return (
    <div>
      <h5 style={{ textAlign: "center" }}>Clinical Records Preview</h5>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, marginLeft: "100px" }}>
          <h3>Patient Information</h3>
          <table>
            <tbody>
              <tr>
                <td>First Name:</td>
                <td>{data.patient.first_name}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{data.patient.last_name}</td>
              </tr>
              <tr>
                <td>Age:</td>
                <td>{data.patient.age}</td>
              </tr>
              <tr>
                <td>Gender:</td>
                <td>{data.patient.gender}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{data.patient.email}</td>
              </tr>
              <tr>
                <td>Phone Number:</td>
                <td>{data.patient.phone_number}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{data.patient.city}</td>
              </tr>
              <tr>
                <td>State:</td>
                <td>{data.patient.state}</td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>{data.patient.country}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ flex: 1 }}>
          <h5>Clinical Record</h5>
          <table>
            <tbody>
              <tr>
                <td>Family History:</td>
                <td>{data.family_history}</td>
              </tr>
              <tr>
                <td>Blood Type:</td>
                <td>{data.blood_type}</td>
              </tr>
              <tr>
                <td>Pregnancy Condition:</td>
                <td>{data.pregnancy_condition ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>Symptoms:</td>
                <td>{data.symptoms}</td>
              </tr>
              <tr>
                <td>Symptoms Description:</td>
                <td>{data.symptoms_description}</td>
              </tr>
              <tr>
                <td>Disease Type:</td>
                <td>{data.disease_type}</td>
              </tr>
              <tr>
                <td>Disease Description:</td>
                <td>{data.disease_description}</td>
              </tr>
              <tr>
                <td>Follow Up Information:</td>
                <td>{data.follow_up_information}</td>
              </tr>
              <tr>
                <td>Image Path:</td>
                <td>{data.image_path || "Not available"}</td>
              </tr>
              <tr>
                <td>Allergies:</td>
                <td>{data.allergies}</td>
              </tr>
              <tr>
                <td>Vaccination Status:</td>
                <td>{data.vaccination_status}</td>
              </tr>
              <tr>
                <td>Sugar Level:</td>
                <td>{data.sugar_level}</td>
              </tr>
              <tr>
                <td>Blood Pressure:</td>
                <td>{data.blood_pressure}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h5>Local Physcian Decision</h5>
        <textarea
          value={decision}
          onChange={(e) => setDecision(e.target.value)}
          placeholder="Enter your decision here"
        />
      </div>
      <div>
        <button className="btn" onClick={handlePrevious}>
          previous
        </button>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
        <button className="btn" onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
};

export default Physician;
