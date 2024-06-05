import React, { useState, useEffect } from "react";
import { message, Modal, Button, Form, Input, InputNumber } from "antd";
import axios from "axios";
import "./physician.css";
import { useParams } from "react-router-dom";

const Physician = () => {
    const { id } = useParams();
  const [data, setData] = useState(null); // Change initial state to null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/clinical-record/${id}/`
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

  const handlePrint = () => {
    window.print();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (values) => {
    const { disease_level, result_description, prescription } = values;
    const postData = {
      disease_level,
      result_description,
      prescription,
      clinical_record: 5,
      technician: 25,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/technical_report/",
        postData
      );
      message.success("Technical report submitted successfully!");
      setReport(response.data);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to submit report:", error);
      message.error("Failed to submit report");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
    <div className="physician-container">
      <h5 style={{ textAlign: "center" }}>Clinical Records Preview</h5>
      <div className="physician-content">
        <div className="physician-info-section">
          <h3>Patient Information</h3>
          <table className="physician-info-table">
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
        <div className="physician-info-section">
          <h3>Clinical Record</h3>
          <table className="physician-info-table">
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
      <div className="physician-button-group">
        <Button type="primary" onClick={handlePrevious}>
          Previous
        </Button>
        <Button type="primary" onClick={showModal}>
          Add Your Decision
        </Button>
        <Button type="primary" onClick={handlePrint}>
          Print
        </Button>
      </div>

      <Modal
        title="Add Your Decision"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleOk}>
          <Form.Item
            label="Disease Level"
            name="disease_level"
            rules={[
              { required: true, message: "Please input the disease level!" },
            ]}
          >
            <InputNumber min={1} max={5} />
          </Form.Item>
          <Form.Item
            label="Result Description"
            name="result_description"
            rules={[
              {
                required: true,
                message: "Please input the result description!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Prescription"
            name="prescription"
            rules={[
              { required: true, message: "Please input the prescription!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {report && (
        <div className="physician-report">
          <h5>Report</h5>
          <p>
            <strong>Disease Level:</strong> {report.disease_level}
          </p>
          <p>
            <strong>Result Description:</strong> {report.result_description}
          </p>
          <p>
            <strong>Prescription:</strong> {report.prescription}
          </p>
        </div>
      )}
    </div>
  );
};

export default Physician;
