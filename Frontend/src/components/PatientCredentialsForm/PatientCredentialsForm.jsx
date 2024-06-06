import React, { useEffect, useState } from "react";
import { bloodGrupOptions } from "../../constant/global";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Select,
  Checkbox,
  InputNumber,
  Steps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./PatientCredentialsForm.css";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const { Step } = Steps;
const { Option } = Select;

const PatientCredentialsForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [clinicalData, setClinicalData] = useState(null);

  const [formData, setFormData] = useState({
    pregnancy_condition: false, // Default value set to false
  });
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [form] = Form.useForm();
  const navigate=useNavigate()

  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://127.0.0.1:8000/patient/technician",
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );
        const data = response.data;
        // Set the fetched data to the state
        setProfileData(data);
        // Log the data to the console
        console.log(data);
      } catch (error) {
        console.log(error);
        // Log any errors to the console
        console.error("There was a problem fetching the data:", error.message);
      }
    };

    // Call the async function to fetch data when the component mounts
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // E
  console.log(profileData);

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      pregnancy_condition: e.target.checked, // Update pregnancy_condition based on checkbox status
    });
  };
  const onSubmit = async (values) => {
    try {
      const data = { ...formData, ...values };
      console.log("Form data:", data);
      // Send form data to backend server
      const response = await axios.post(
        "http://127.0.0.1:8000/clinical-record/",
        data
      );
      message.success("clinical record  submitted successfully!");
      // Handle response if needed
        navigate(`/admin/physician/${response.data.id}`);
    } catch (error) {
      console.error("Failed to submit form:", error);
      message.error("A clinical record for this patient already exists", error);
    }
  };
  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://127.0.0.1:8000/clinical_record/",
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );
        const data = response.data;
        // Set the fetched data to the state
        setClinicalData(data);
        // Log the data to the console
        console.log(data);
      } catch (error) {
        console.log(error);
        // Log any errors to the console
        console.error("There was a problem fetching the data:", error.message);
      }
    };

    // Call the async function to fetch data when the component mounts
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // E
  console.log(clinicalData);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFormChange = (_, allFields) => {
    const newFormData = { ...formData };
    allFields.forEach((field) => {
      const [fieldName] = field.name;
      newFormData[fieldName] = field.value;
    });
    setFormData(newFormData);

    const isFormValid = allFields.every((field) => !field.errors.length);
    setIsNextDisabled(!isFormValid);
  };

  return (
    <>
      <div className="form-container">
        <Steps current={currentStep}>
          <Step title="Patient Credentials 1" />
          <Step title="Patient Credentials 2" />
        </Steps>
        <Form
          form={form}
          name="patient-form"
          onFinish={onSubmit}
          onFieldsChange={handleFormChange}
        >
          <div className="step-container">
            {currentStep === 0 && (
              <>
                <Form.Item
                  label="Select Patient"
                  name="patient"
                  rules={[
                    { required: true, message: "Please select a patient!" },
                  ]}
                >
                  <Select placeholder="Select a patient">
                    {profileData?.map((patient) => (
                      <Option key={patient.id} value={patient.id}>
                        {patient.first_name} {patient.last_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  className="medical"
                  label="Medical History"
                  name="medical_history"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea rows={1} />
                </Form.Item>
                <Form.Item
                  className="select"
                  label="Disease Type"
                  name="disease_type"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="S">Skin Disease</Option>
                    <Option value="E">Eye Disease</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Disease Description"
                  name="disease_description"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea rows={1} />
                </Form.Item>
                <Form.Item
                  label="Symptoms"
                  name="symptoms"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea rows={1} />
                </Form.Item>
                <Form.Item
                  label="Blood Group"
                  name="blood_type"
                  className="select"
                  rules={[{ required: true }]}
                >
                  <Select>
                    {bloodGrupOptions.map((option, index) => (
                      <Option key={index} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Symptoms Description"
                  name="symptoms_description"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea rows={1} />
                </Form.Item>{" "}
                <Form.Item label="Pregnancy" valuePropName="checked">
                  <Checkbox
                    checked={formData.pregnancy_condition}
                    onChange={handleCheckboxChange}
                  >
                    Yes
                  </Checkbox>
                </Form.Item>
              </>
            )}
            {currentStep === 1 && (
              <>
                <Form.Item
                  className="medical"
                  label="Family History"
                  name="family_history"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea rows={1} />
                </Form.Item>
                <Form.Item
                  label="Vaccination Status"
                  className="select"
                  name="vaccination_status"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="vaccinated">Vaccinated</Option>
                    <Option value="notVaccinated">Not Vaccinated</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Follow-up Information"
                  name="follow_up_information"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea rows={1} />
                </Form.Item>
                <Form.Item
                  label="Allergies"
                  name="allergies"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea rows={1} />
                </Form.Item>
                <Form.Item
                  label="Message"
                  name="message"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea rows={1} />
                </Form.Item>
                <Form.Item
                  label="Blood Sugar Level"
                  name="sugar_level"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={0} step={1} />
                </Form.Item>
                <Form.Item
                  label="Blood Pressure"
                  name="blood_pressure"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={0} />
                </Form.Item>
              </>
            )}
          </div>
          <div className="button-container">
            {currentStep > 0 && (
              <Button className="button" onClick={prevStep}>
                Previous
              </Button>
            )}
            {currentStep === 1 && (
              <div className="submit-button-container">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            )}

            {currentStep < 1 && (
              <Button
                className="button"
                type="primary"
                onClick={nextStep}
                disabled={isNextDisabled}
              >
                Next
              </Button>
            )}
          </div>
          <div> </div>
        </Form>
      </div>
      {/* <div className="three">
        {currentStep === 1 && (
          <div className="three-buttons">
            <h6>use one of these</h6>

            {clinicalData?.map((clinical_record) => (
              <Option key={clinical_record.id}></Option>
            ))}
            <div>
              <Link to="/admin/physician/">
                <button style={{ textAlign: "center", marginTop: "30px" }}>
                  your Decision
                </button>
              </Link>
            </div>

            <div>
              {" "}
              <Link to="/scan">
                <button style={{ textAlign: "center", marginTop: "30px" }}>
                  upload image
                </button>
              </Link>
            </div>
            <div>
              <Link to="/doctors">
                <button style={{ textAlign: "center", marginTop: "30px" }}>
                  appointment
                </button>
              </Link>
            </div>
          </div>
        )}
      </div> */}
    </>
  );
};

export default PatientCredentialsForm;
