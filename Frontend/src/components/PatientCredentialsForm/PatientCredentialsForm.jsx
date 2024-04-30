import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import "./PatientCredentialsForm.css";

const { Option } = Select;
const { Step } = Steps;

const steps = [
  {
    title: "Step 1",
    fields: [
      "medicalHistory",
      "diseaseType",
      "diseaseDescription",
      "pregnancy",
      "symptoms",
      "symptomDescription",
    ],
  },
  {
    title: "Step 2",
    fields: [
      "familyHistory",
      "bloodSugarLevel",
      "bloodPressure",
      "vaccinationStatus",
      "followUpInformation",
      "allergies",
    ],
  },
  {
    title: "Step 3",
    fields: ["images"],
  },
];

const PatientCredentialsForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [fileList, setFileList] = useState([]);
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log("Form data:", data);
    console.log("Uploaded files:", fileList);
    // You can handle form submission logic here
    message.success("Form submitted successfully!");
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
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

  return (
    <Form name="patient-form" onFinish={handleSubmit(onSubmit)}>
      <Steps current={currentStep} style={{ marginBottom: "20px" }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="form-container">
        {steps[currentStep].fields.map((fieldName) => (
          <Form.Item
            key={fieldName}
            label={fieldName
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, function (str) {
                return str.toUpperCase();
              })}
            name={fieldName}
            rules={[
              {
                required: true,
                message: `Please enter the ${fieldName}`,
              },
            ]}
          >
            <Input className="input" />
          </Form.Item>
        ))}
      </div>
      {currentStep < steps.length - 1 && (
        <div style={{ textAlign: "center" }}>
          <Button type="primary" onClick={nextStep}>
            Next
          </Button>
        </div>
      )}
      {currentStep === steps.length - 1 && (
        <>
          <Form.Item className="form" label="Upload Images">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {/* Image preview */}
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
          <div style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </>
      )}
      {currentStep > 0 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button onClick={prevStep}>Previous</Button>
        </div>
      )}
    </Form>
  );
};

export default PatientCredentialsForm;
