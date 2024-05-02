import React, { useEffect, useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Steps, Button, message } from "antd";
import { DatePicker } from "antd";
import ImageUpload from "../../UI/form/ImageUpload";
import pImage from "../../../images/avatar.jpg";
import PatientCredentialsForm from "../../PatientCredentialsForm/PatientCredentialsForm";

const { Step } = Steps;

const PatientProfileSetting = ({ data }) => {
  const { register, handleSubmit } = useForm({});
  const [selectValue, setSelectValue] = useState({});
  const [date, setDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const onChange = (date, dateString) => {
    setDate(moment(dateString).format());
  };

  const handleChange = (e) => {
    setSelectValue({ ...selectValue, [e.target.name]: e.target.value });
  };

  const onSubmit = (data) => {
    const obj = data;
    const newObj = { ...obj, ...selectValue };
    date && (newObj["date_of_birth"] = date);
    const changedValue = Object.fromEntries(
      Object.entries(newObj).filter(([key, value]) => value !== "")
    );
    console.log("Form data:", changedValue);

  };

  useEffect(() => {
    // Add your success and error handling logic here
  }, []);

  const steps = [
    {
      title: "Patient Information",
      content: (
        <div style={{ marginBottom: "10rem" }}>
          <div
            className="w-100 mb-3 rounded mb-5 p-2"
            style={{ background: "#f8f9fa" }}
          >
            <h5 className="text-title mb-2 mt-3">Add Patient Information</h5>{" "}
            <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-md-12">
                <div className="form-group">
                  <div className="change-avatar d-flex gap-2 align-items-center">
                    <Link to={"/"} className="my-3 patient-img">
                      <img
                        src={
                          selectedImage ? selectedImage : data?.img || pImage
                        }
                        alt=""
                      />
                    </Link>
                    <div className="mt-3">
                      <ImageUpload
                        setSelectedImage={setSelectedImage}
                        setFile={setFile}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label>
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    defaultValue={data?.first_name}
                    name="first_name"
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label>
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    defaultValue={data?.last_name}
                    name="last_name"
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label>
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    defaultValue={data?.email}
                    name="email"
                    type="email"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label>
                    Date of Birth{" "}
                    {moment(data?.date_of_birth).format("YYYY-MM-DD")}
                  </label>
                  <DatePicker
                    onChange={onChange}
                    format={"YYYY-MM-DD"}
                    style={{ width: "100%", padding: "6px" }}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label>Phone Number</label>
                  <input
                    defaultValue={data?.phone}
                    name="phone"
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2">
                  <label>Gender</label>
                  <select
                    className="form-control select"
                    onChange={handleChange}
                    name="gender"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mb-2">
                  <label className="form-label">City</label>
                  <input
                    defaultValue={data?.city}
                    name="city"
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label>State</label>
                  <input
                    defaultValue={data?.state}
                    name="state"
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label>Country</label>
                  <input
                    defaultValue={data?.country}
                    name="country"
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary my-3">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      ),
    },
    {
      title: "Patient Credentials",
      content: (
        <div>
          <PatientCredentialsForm />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Steps current={currentStep}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentStep].content}</div>
      <div className="steps-action">
        {currentStep < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default PatientProfileSetting;
