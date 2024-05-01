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

const { Step } = Steps;
const { Option } = Select;

const PatientCredentialsForm = () => {
  const [fileList, setFileList] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    console.log("Form data:", values);
    try {
      const values = await form.validateFields();
      console.log("Form data:", values);
      console.log(
        "Uploaded files:",
        fileList.map((file) => ({
          uid: file.uid,
          name: file.name,
          type: file.type,
          size: file.size,
        }))
      );
      message.success("Form submitted successfully!");
    } catch (errorInfo) {
      console.error("Failed to submit form:", errorInfo);
    }
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadProps = {
    name: "file",
    multiple: true,
    fileList,
    beforeUpload: () => false, // Prevent files from being uploaded automatically
    onChange: handleFileChange,
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFormChange = (_, allFields) => {
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
        {currentStep === 0 && (
          <>
            <Form.Item
              label="Medical History"
              name="medicalHistory"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item
              label="Disease Type"
              name="disease_type"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="Skin_disease">Skin Disease</Option>
                <Option value="Eye_disease">Eye Disease</Option>
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
              label="Pregnancy"
              name="pregnancy"
              valuePropName="checked"
            >
              <Checkbox>Yes</Checkbox>
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
            </Form.Item>
          </>
        )}
        {currentStep === 1 && (
          <>
            <Form.Item
              label="Family History"
              name="familyHistory"
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
            <Form.Item
              label="Vaccination Status"
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
          </>
        )}
        {currentStep === 2 && (
          <Form.Item label="Upload Images" className="upload-images-container">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            <div className="image-preview-container">
              {fileList.map((file) => (
                <img
                  key={file.uid}
                  src={URL.createObjectURL(file.originFileObj)}
                  alt="Preview"
                  className="image-preview"
                />
              ))}
            </div>
          </Form.Item>
        )}
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
        <div className="submit-button-container">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    
    </div>
  );
};

export default PatientCredentialsForm;
