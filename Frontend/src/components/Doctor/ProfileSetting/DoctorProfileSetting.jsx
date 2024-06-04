import React, { useEffect, useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { Button, Select, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import pImage from "../../../images/avatar.jpg";
import { Link } from "react-router-dom";
import { DatePicker } from "antd";
import AdditionalEducationPopup from "./AdditionalEducationPopup";
import AdditionalExperiance from "./AdditionalExperience";
import loginService from "../../../service/auth.service";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const DoctorProfileSetting = () => {
  const [isEducationPopupVisible, setIsEducationPopupVisible] = useState(false);
  const [isExperiencePopupVisible, setIsExperiencePopupVisible] =
    useState(false);

  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);

  console.log(decoded.user_id);

  const { register, handleSubmit } = useForm({});
  const [userId, setUserId] = useState("");
  const [selectValue, setSelectValue] = useState({});
  const [date, setDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  const [formField, setFormField] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    profile_picture: "",

    phone: "",
    date_of_birth: moment().format("YYYY-MM-DD"),
    gender: "",
    about_me: "",
    clinic_name: "",

    clinic_address: "",
    service: "",
    specialization: "",
    license_number: "",
    address_line: "",

    city: "",
    state: "",
    country: "",

    edu_type: "",
    edu_collage: "",
    edu_year_of_completion: moment().format("YYYY-MM-DD"),
    exp_hospital_name: "",
    exp_designation: "",
    exp_start_date: moment().format("YYYY-MM-DD"),
    exp_end_date: moment().format("YYYY-MM-DD"),
  });

  const onChange = (date, dateString) => {
    setDate(moment(dateString).format());
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField({ ...formField, [name]: value });
  };

  const handleProfileSubmit = async (data) => {
    const combinedFormData = { ...formField, ...data };
    const formData = new FormData();

    Object.keys(combinedFormData).forEach((key) => {
      formData.append(key, combinedFormData[key]);
    });

    if (file) {
      formData.append("profile_picture", file);
    }

    try {
      const response = await loginService.DoctorProfile(formData);
      message.success("Profile updated successfully! you will be verified soon!");
      console.log("response", combinedFormData);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error);
    }
  };

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
    // console.log("Education Data:", educationData);
  };

  const handleAddExperience = (experienceData) => {
    // Handle adding experience data here
    // console.log("Experience Data:", experienceData);
  };

  console.log(decoded.user_id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://127.0.0.1:8000/specialist/profile/",
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );

        setProfileData(response.data);
        setFormField(response.data);
        setError(null);

        console.log("Profile Data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ marginBottom: "10rem" }}>
      <div
        className="w-100 mb-3 rounded mb-5 p-2"
        style={{ background: "#f8f9fa" }}
      >
        <h5 className="text-title mb-2 mt-3">Update Your Information</h5>

        {profileData && (
          <form
            className="row form-row"
            onSubmit={handleSubmit(handleProfileSubmit)}
          >
            <div className="col-md-12">
              <div className="form-group">
                <div className="change-avatar d-flex gap-2 align-items-center">
                  <Link to={"/doctor"} className="my-3 patient-img">
                    <img
                      src={
                        selectedImage
                          ? selectedImage
                          : formField.profile_picture || pImage
                      }
                      alt=""
                    />
                  </Link>
                  <div className="mt-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
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
                  placeholder="First Name"
                  name="first_name"
                  type="text"
                  onChange={handleChange}
                  value={formField.first_name}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label>
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  placeholder="Last Name"
                  name="last_name"
                  type="text"
                  onChange={handleChange}
                  value={formField.last_name}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label>
                  User Name <span className="text-danger">*</span>
                </label>
                <input
                  placeholder="username"
                  name="username"
                  type="text"
                  onChange={handleChange}
                  value={formField.username}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label>Email</label>
                <input
                  placeholder="Email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={formField.email}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label>Phone Number</label>
                <input
                  placeholder="Phone Number"
                  name="phone"
                  type="tel"
                  onChange={handleChange}
                  value={formField.phone}
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
                  <option value="">Select</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label>
                  Date of Birth{" "}
                  {formField.date_of_birth &&
                    moment(formField.date_of_birth).format("LL")}
                </label>
                <DatePicker
                  onChange={(date, dateString) =>
                    setFormField({ ...formField, date_of_birth: dateString })
                  }
                  format={"YYYY-MM-DD"}
                  style={{ width: "100%", padding: "6px" }}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="card mb-2 mt-2">
                <div className="card-body">
                  <h6 className="card-title text-secondary">About Me</h6>
                  <div className="form-group mb-0">
                    <textarea
                      className="form-control"
                      rows="5"
                      name="about_me"
                      onChange={handleChange}
                      value={formField.about_me}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label>Clinic Name</label>
                <input
                  className="form-control"
                  name="clinic_name"
                  type="text"
                  onChange={handleChange}
                  value={formField.clinic_name}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label>Clinic Address</label>
                <input
                  className="form-control"
                  name="clinic_address"
                  type="text"
                  onChange={handleChange}
                  value={formField.clinic_address}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label>Service</label>
                <input
                  className="form-control"
                  name="service"
                  type="text"
                  onChange={handleChange}
                  value={formField.service}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label>Specialization</label>
                <input
                  className="form-control"
                  name="specialization"
                  type="text"
                  onChange={handleChange}
                  value={formField.specialization}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label>License Number</label>
                <input
                  className="form-control"
                  name="license_number"
                  type="text"
                  onChange={handleChange}
                  value={formField.license_number}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label>Address Line</label>
                <input
                  className="form-control"
                  name="address_line"
                  type="text"
                  onChange={handleChange}
                  value={formField.address_line}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label>City</label>
                <input
                  className="form-control"
                  name="city"
                  type="text"
                  onChange={handleChange}
                  value={formField.city}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label>State / Province</label>
                <input
                  className="form-control"
                  name="state"
                  type="text"
                  onChange={handleChange}
                  value={formField.state}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label>Country</label>
                <input
                  className="form-control"
                  name="country"
                  type="text"
                  onChange={handleChange}
                  value={formField.country}
                />
              </div>
            </div>

            <div className="card education-sec">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h4 className="text-secondary">Education</h4>
                    <div className="form-group">
                      <label>College/Institute</label>
                      <input
                        className="form-control"
                        type="text"
                        name="edu_collage"
                        onChange={handleChange}
                        value={formField.edu_collage}
                      />
                    </div>
                    <div className="form-group">
                      <label>Year of Completion</label>
                      <DatePicker
                        onChange={(date, dateString) =>
                          setFormField({
                            ...formField,
                            edu_year_of_completion: dateString,
                          })
                        }
                        format={"YYYY-MM-DD"}
                        style={{ width: "100%", padding: "6px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card experience-sec">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h4 className="text-secondary">Experience</h4>
                    <div className="form-group">
                      <label>Hospital Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="exp_hospital_name"
                        onChange={handleChange}
                        value={formField.exp_hospital_name}
                      />
                    </div>
                    <div className="form-group">
                      <label>Designation</label>
                      <input
                        className="form-control"
                        type="text"
                        name="exp_designation"
                        onChange={handleChange}
                        value={formField.exp_designation}
                      />
                    </div>
                    <div className="form-group">
                      <label>From</label>
                      <DatePicker
                        onChange={(date, dateString) =>
                          setFormField({
                            ...formField,
                            exp_start_date: dateString,
                          })
                        }
                        format={"YYYY-MM-DD"}
                        style={{ width: "100%", padding: "6px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label>To</label>
                      <DatePicker
                        onChange={(date, dateString) =>
                          setFormField({
                            ...formField,
                            exp_end_date: dateString,
                          })
                        }
                        format={"YYYY-MM-DD"}
                        style={{ width: "100%", padding: "6px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 mt-3">
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </div>

      <AdditionalEducationPopup
        visible={isEducationPopupVisible}
        onClose={handleEducationPopupClose}
        onAdd={handleAddEducation}
      />
      <AdditionalExperiance
        visible={isExperiencePopupVisible}
        onClose={handleExperiencePopupClose}
        onAdd={handleAddExperience}
      />
    </div>
  );
};

export default DoctorProfileSetting;
