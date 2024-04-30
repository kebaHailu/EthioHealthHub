import React, { useEffect, useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { bloodGrupOptions } from "../../../constant/global";
import { useUpdatePatientMutation } from "../../../redux/api/patientApi";
import { message, Steps, Button } from "antd";
import ImageUpload from "../../UI/form/ImageUpload";
import pImage from "../../../images/avatar.jpg";
import { DatePicker } from "antd";
import PatientCredentialsForm from "../../PatientCredentialsForm/PatientCredentialsForm";

const { Step } = Steps;

const PatientProfileSetting = ({data}) => {
  const { register, handleSubmit } = useForm({});
  const [userId, setUserId] = useState("");
  const [selectBloodGroup, setSelectBloodGroup] = useState("");
  const [selectValue, setSelectValue] = useState({});
  const [updatePatient, { isSuccess, isError, error, isLoading }] =
    useUpdatePatientMutation();
  const [date, setDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const onChange = (date, dateString) => {
    setDate(moment(dateString).format());
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      message.success("Successfully Profile Updated");
      setCurrentStep(currentStep + 1); // Move to the next step upon successful profile update
    }
    if (!isLoading && isError) {
      message.error(error?.data?.message);
    }
  }, [isLoading, isSuccess, isError, error, currentStep]);

  const handleChange = (e) => {
    setSelectValue({ ...selectValue, [e.target.name]: e.target.value });
    if (e.target.name === "bloodGroup") {
      setSelectBloodGroup(e.target.value);
    }
  };

  const onSubmit = (data) => {
    const obj = data;
    const newObj = { ...obj, ...selectValue };
    date && (newObj["dateOfBirth"] = date);
    const changedValue = Object.fromEntries(
      Object.entries(newObj).filter(([key, value]) => value !== "")
    );
    const formData = new FormData();
    selectedImage && formData.append("file", file);
    const changeData = JSON.stringify(changedValue);
    formData.append("data", changeData);
    updatePatient({ data: formData, id: userId });
  };

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
                    defaultValue={data?.firstName}
                    {...register("firstName")}
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
                    defaultValue={data?.lastName}
                    {...register("lastName")}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label>
                    Email <span className="text-danger">*</span>
                  </label>
                  <input defaultValue={data?.email} className="form-control" />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label>
                    Date of Birth {moment(data?.dateOfBirth).format("LL")}
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
                    defaultValue={data?.mobile}
                    {...register("mobile")}
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
                    <option value={""}>Select</option>
                    <option className="text-capitalize">male</option>
                    <option className="text-capitalize">female</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mb-2">
                  <label className="form-label">Blood Group</label>
                  <select
                    className="form-control select"
                    onChange={handleChange}
                    name="bloodGroup"
                    value={selectBloodGroup}
                  >
                    {bloodGrupOptions.map((option, index) => (
                      <option
                        key={index}
                        value={option.value}
                        className="text-capitalize"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mb-2">
                  <label className="form-label">City</label>
                  <input
                    defaultValue={data?.city}
                    {...register("city")}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label>State</label>
                  <input
                    defaultValue={data?.state}
                    {...register("state")}
                    className="form-control"
                  />
                </div>
              </div>
              {/* <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Zip Code</label>
                            <input defaultValue={data?.zipCode} {...register("zipCode")} className="form-control" />
                        </div>
                    </div> */}
              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label>Country</label>
                  <input
                    defaultValue={data?.country}
                    {...register("country")}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label>Address</label>
                  <input
                    defaultValue={data?.address}
                    {...register("address")}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary my-3"
                  disabled={isLoading ? true : false}
                >
                  {isLoading ? "Updating.." : "Save Changes"}
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
