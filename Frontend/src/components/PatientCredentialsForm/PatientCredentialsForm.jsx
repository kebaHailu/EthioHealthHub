import React, { useState } from "react";
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
import ImageUpload from "../UI/form/ImageUpload";
import axios from "axios";

const { Step } = Steps;
const { Option } = Select;

const PatientCredentialsForm = () => {
  const [fileList, setFileList] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    pregnancy_condition: false, // Default value set to false
  });
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [form] = Form.useForm();
  // const [formField, setFormField] = useState({
  //   family_history: "",
  //   blood_type: "",
  //   pregnancy_condition: false,
  //   symptoms: "",
  //   symptoms_description: "",
  //   disease_type: null,
  //   disease_description: "",
  //   follow_up_information: "",
  //   image_path: "",
  //   model_result: "",
  //   allergies: "",
  //   vaccination_status: "",
  //   sugar_level: "",
  //   blood_pressure: "",
  // });

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      pregnancy_condition: e.target.checked, // Update pregnancy_condition based on checkbox status
    });
  };
  const onSubmit = async (values) => {
    try {
      const data = { ...formData, ...values, fileList };
      console.log("Form data:", data);
      // Send form data to backend server
      const response = await axios.post(
        "http://127.0.0.1:8000/clinical-record/",
        data
      );
      message.success("Form submitted successfully!");
      // Handle response if needed
    } catch (error) {
      console.error("Failed to submit form:", error);
      message.error("Failed to submit form. Please try again.");
    }
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadProps = {
    name: "file",
    multiple: true,
    fileList,
    beforeUpload: () => false,
    onChange: handleFileChange,
  };

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
    <div className="form-container">
      <Steps current={currentStep}>
        <Step title="Patient Credentials 1" />
        <Step title="Patient Credentials 2" />
        <Step title="Image Upload" />
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
                className="medical"
                label="Medical History"
                name="medicalHistory"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={2} />
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
                <Input.TextArea rows={2} />
              </Form.Item>
              <Form.Item
                label="Symptoms"
                name="symptoms"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={2} />
              </Form.Item>
              <Form.Item
                label="Blood Group"
                name="bloodGroup"
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
                <Input.TextArea rows={2} />
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
                name="familyHistory"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={2} />
              </Form.Item>
              <Form.Item
                label="Vaccination Status"
                className="select"
                name="vaccinationStatus"
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
                <Input.TextArea rows={3} />
              </Form.Item>
              <Form.Item
                label="Allergies"
                name="allergies"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={2} />
              </Form.Item>
              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={2} />
              </Form.Item>
              <Form.Item
                label="Blood Sugar Level"
                name="bloodSugarLevel"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} step={0.1} />
              </Form.Item>
              <Form.Item
                label="Blood Pressure"
                name="bloodPressure"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </>
          )}
          {currentStep === 2 && (
            <Form.Item label="Upload Images">
              <ImageUpload
                fileList={fileList}
                onFileChange={(file) => {
                  setFileList([...fileList, file]);
                }}
              />
            </Form.Item>
          )}
        </div>
        <div className="button-container">
          {currentStep > 0 && (
            <Button className="button" onClick={prevStep}>
              Previous
            </Button>
          )}
          {currentStep < 2 && (
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
        {currentStep === 2 && (
          <div className="submit-button-container">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default PatientCredentialsForm;
