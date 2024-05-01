import React, { useEffect, useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { Button, Select, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useUpdateDoctorMutation } from "../../../redux/api/doctorApi";
// import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import { doctorSpecialistOptions } from "../../../constant/global";
import ImageUpload from "../../UI/form/ImageUpload";
import dImage from "../../../images/avatar.jpg";
import { DatePicker} from "antd";
import AdditionalEducationPopup from "./AdditionalEducationPopup";
import AdditionalExperiance from "./AdditionalExperience";

const DoctorProfileSetting = () => {
   const [isEducationPopupVisible, setIsEducationPopupVisible] =
     useState(false);
   const [isExperiencePopupVisible, setIsExperiencePopupVisible] =
     useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  const [updateDoctor, { isLoading, isSuccess, isError, error }] =
    useUpdateDoctorMutation();
  // const { data } = useAuthCheck();
  const { data } = "";
  const { register, handleSubmit } = useForm({});
  const [userId, setUserId] = useState("");
  const [selectValue, setSelectValue] = useState({});
  const [date, setDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (data) {
      const { id, services } = data;
      setUserId(id);
      setSelectedItems(services?.split(","));
    }
  }, [data]);

  const handleChange = (e) => {
    setSelectValue({ ...selectValue, [e.target.name]: e.target.value });
  };
  const onChange = (date, dateString) => {
    setDate(moment(dateString).format());
  };

  const onSubmit = (data) => {
    const obj = data;
    obj.price && obj.price.toString();
    const newObj = { ...obj, ...selectValue };
    date && (newObj["dob"] = date);
    newObj["services"] = Array.isArray(selectedItems)
      ? selectedItems.join(",")
      : null;
    const changedValue = Object.fromEntries(
      Object.entries(newObj).filter(([key, value]) => value !== "")
    );
    const formData = new FormData();
    selectedImage && formData.append("file", file);
    const changeData = JSON.stringify(changedValue);
    formData.append("data", changeData);
    updateDoctor({ data: formData, id: userId });
  };

  useEffect(() => {
    if (!isLoading && isError) {
      message.error(error?.data?.message);
    }
    if (isSuccess) {
      message.success("Successfully Changed Saved !");
    }
  }, [isLoading, isError, error, isSuccess]);

  //  const [isPopupVisible, setIsPopupVisible] = useState(false);

    

     const handleEducationPopupOpen = () => {
       setIsEducationPopupVisible(true);
     };

     const handleEducationPopupClose = () => {
       setIsEducationPopupVisible(false);
     };

     const handleExperiencePopupOpen = () => {
       setIsExperiencePopupVisible(true);
     };

     const handleExperiencePopupClose = () => {
       setIsExperiencePopupVisible(false);
     };


       const handleAddEducation = (educationData) => {
         // Handle adding education data here
         console.log("Education Data:", educationData);
       };

       const handleAddExperience = (experienceData) => {
         // Handle adding experience data here
         console.log("Experience Data:", experienceData);
       };
  return (
    <div style={{ marginBottom: "10rem" }}>
      <div
        className="w-100 mb-3 rounded mb-5 p-2"
        style={{ background: "#f8f9fa" }}
      >
        <h5 className="text-title mb-2 mt-3">Update Your Information</h5>
        <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-12 mb-5">
            <div className="form-group">
              <div className="change-avatar d-flex gap-2 align-items-center">
                <Link to={"/"} className="my-3 patient-img">
                  <img
                    src={selectedImage ? selectedImage : data?.img || dImage}
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
              <label>Email</label>
              <input
                defaultValue={data?.email}
                {...register("email")}
                className="form-control"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label>Phone Number</label>
              <input
                defaultValue={data?.phone}
                {...register("phone")}
                className="form-control"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
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
            <div className="form-group mb-2 card-label">
              <label>Date of Birth {moment(data?.dob).format("LL")}</label>
              <DatePicker
                onChange={onChange}
                format={"YYYY-MM-DD"}
                style={{ width: "100%", padding: "6px" }}
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 mt-2">
              <div className="card-body">
                <h6 className="card-title text-secondary">About Me</h6>
                <div className="form-group mb-2 card-label">
                  <label>Biography</label>
                  <textarea
                    defaultValue={data?.biography}
                    {...register("biography")}
                    className="form-control"
                    rows={5}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">Clinic Info</h6>
              <div className="row form-row">
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label>Clinic Name</label>
                    <input
                      defaultValue={data?.clinicName}
                      {...register("clinicName")}
                      className="form-control"
                      rows={5}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label>Clinic Address</label>
                    <input
                      type="text"
                      defaultValue={data?.clinicAddress}
                      {...register("clinicAddress")}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">Contact Details</h6>
              <div className="row form-row">
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label>Address Line</label>
                    <input
                      defaultValue={data?.address}
                      {...register("address")}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label>City</label>
                    <input
                      defaultValue={data?.city}
                      {...register("city")}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label>State / Province</label>
                    <input
                      defaultValue={data?.state}
                      {...register("state")}
                      className="form-control"
                    />
                  </div>
                </div>
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
                    <label>Postal Code</label>
                    <input
                      defaultValue={data?.postalCode}
                      {...register("postalCode")}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">Licence</h6>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label>licence_id</label>
                    <input
                      defaultValue={data?.price}
                      {...register("uniqueId")}
                      type="string"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">
                Services and Specialization
              </h6>
              <div className="row form-row">
                <div className="form-group mb-2 card-label">
                  <label>Services</label>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    value={selectedItems}
                    onChange={setSelectedItems}
                    options={doctorSpecialistOptions}
                  />
                  <small className="form-text text-muted">
                    Note : Type & Press enter to add new services
                  </small>
                </div>
                <div className="form-group mb-2 card-label">
                  <label>Specialization </label>
                  <input
                    defaultValue={data?.specialization}
                    {...register("specialization")}
                    className="input-tags form-control"
                    placeholder="Enter Specialization"
                  />
                  <small className="form-text text-muted">
                    Note : Type & Press enter to add new specialization
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <div className="text-end">
                <PlusCircleOutlined
                  style={{ fontSize: "24px", cursor: "pointer" }}
                  onClick={handleEducationPopupOpen}
                />
              </div>
              <AdditionalEducationPopup
                visible={isEducationPopupVisible}
                onCancel={handleEducationPopupClose}
                onAdd={handleAddEducation}
              />
              <h6 className="card-title text-secondary">Education</h6>
              <div className="row form-row">
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="form-group mb-2 card-label">
                    <label>Degree</label>
                    <input
                      defaultValue={data?.degree}
                      {...register("degree")}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                  <div className="form-group mb-2 card-label">
                    <label>College/Institute</label>
                    <input
                      defaultValue={data?.college}
                      {...register("college")}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="form-group mb-2 card-label">
                    <label>Year of Completion</label>
                    <input
                      defaultValue={data?.completionYear}
                      {...register("completionYear")}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <div className="text-end">
                <PlusCircleOutlined
                  style={{ fontSize: "24px", cursor: "pointer" }}
                  onClick={handleExperiencePopupOpen}
                />
              </div>
              <AdditionalExperiance
                visible={isExperiencePopupVisible}
                onCancel={handleExperiencePopupClose}
                onAdd={handleAddExperience}
              />

              <h6 className="card-title text-secondary">Experience</h6>
              <div className="row form-row">
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="form-group mb-2 card-label">
                    <label>Hospital Name</label>
                    <input
                      defaultValue={data?.experienceHospitalName}
                      {...register("experienceHospitalName")}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="form-group mb-2 card-label">
                    <label>From</label>
                    <input
                      defaultValue={data?.expericenceStart}
                      {...register("expericenceStart")}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="form-group mb-2 card-label">
                    <label>To</label>
                    <input
                      defaultValue={data?.expericenceEnd}
                      {...register("expericenceEnd")}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="form-group mb-2 card-label">
                    <label>Designation</label>
                    <input
                      defaultValue={data?.designation}
                      {...register("designation")}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center my-3">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              loading={isLoading}
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Saving ..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorProfileSetting;
