import React, { useEffect, useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { Button, Select, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
// import { useUpdateDoctorMutation } from "../../../redux/api/doctorApi";
// import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import { doctorSpecialistOptions } from "../../../constant/global";
import ImageUpload from "../../UI/form/ImageUpload";
import dImage from "../../../images/avatar.jpg";
import { DatePicker } from "antd";
import AdditionalEducationPopup from "./AdditionalEducationPopup";
import AdditionalExperiance from "./AdditionalExperience";
import loginService from "../../../service/auth.service";
import jwtDecode from "jwt-decode";
import axios from "axios";

const DoctorProfileSetting = () => {
  const [isEducationPopupVisible, setIsEducationPopupVisible] = useState(false);
  const [isExperiencePopupVisible, setIsExperiencePopupVisible] =
    useState(false);

  const [selectedItems, setSelectedItems] = useState([]);

  // const { data } = useAuthCheck();
  const { data } = "";
  const { register, handleSubmit } = useForm({});
  const [userId, setUserId] = useState("");
  const [selectValue, setSelectValue] = useState({});
  const [date, setDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const [formField, setFormField] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    profile_picture: "",

    phone: "",
    date_of_birth: moment().format("YYYY-MM-DD"), // Initialize date_of_birth with current date in "MM-DD-YYYY"
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

    type: "",
    collage: "",
    year_of_completion: "",

    hospital_name: "",
    designation: "",
    start_date: "",
    end_date: "",
  });

  const onChange = (date, dateString) => {
    setDate(moment(dateString).format());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField({ ...formField, [name]: value });
  };


  const handleProfieSubmit = async (e, data) => {
    e.preventDefault();
    const combinedFormData = { ...formField, ...data };
    try {
      const [response, educationalResponse, experianceResponse] = await Promise.all ([
        loginService.DoctorProfile(combinedFormData),
        loginService.DoctorProfileEducationUpdate(combinedFormData),
        loginService.DoctorProfileExperienceUpdate(combinedFormData),
      ]);
      message.success("Profile updated successfully!");
      console.log("response", combinedFormData);
     
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile. Please try again.");
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
    console.log("Education Data:", educationData);
  };

  const handleAddExperience = (experienceData) => {
    // Handle adding experience data here
    console.log("Experience Data:", experienceData);
  };
  // const token = localStorage.getItem("token");
  // const token = "eyJ0eXAiO.../// jwt token";
  // const decoded = jwtDecode(token);

  // console.log(decoded.user_id);
useEffect(() => {
  const fetchData = async () => {
    try {
      const [profileResponse, educationResponse, experienceResponse] =
        await Promise.all([
          axios.get("http://127.0.0.1:8000/specialist/profile/1/"),
          axios.get("http://127.0.0.1:8000/specialist/education/1/"),
          axios.get("http://127.0.0.1:8000/specialist/experience/1/"),
        ]);
      setFormField(educationResponse.data);
      setProfileData(educationResponse.data);
      setFormField(experienceResponse.data);
      setProfileData(experienceResponse.data)
      setProfileData(profileResponse.data);
      setFormField(profileResponse.data);

      console.log("Profile Data:", profileResponse.data);
      console.log("Education Data:", educationResponse.data);
      console.log("Experience Data:", experienceResponse.data);
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
          <form className="row form-row" onSubmit={handleProfieSubmit}>
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
                  <div className="form-group mb-2 card-label">
                    <label>Biography</label>
                    <textarea
                      placeholder="Biography"
                      name="about_me"
                      className="form-control"
                      rows={5}
                      onChange={handleChange}
                      value={formField.about_me}
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
                        placeholder="Clinic Name"
                        name="clinic_name"
                        type="text"
                        onChange={handleChange}
                        value={formField.clinic_name}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mb-2 card-label">
                      <label>Clinic Address</label>
                      <input
                        placeholder="Clinic Address"
                        name="clinic_address"
                        type="text"
                        onChange={handleChange}
                        value={formField.clinic_address}
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
                        placeholder="Address Line"
                        name="address_line"
                        type="text"
                        onChange={handleChange}
                        value={formField.address_line}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mb-2 card-label">
                      <label>City</label>
                      <input
                        placeholder="City"
                        name="city"
                        type="text"
                        onChange={handleChange}
                        value={formField.city}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mb-2 card-label">
                      <label>State / Province</label>
                      <input
                        placeholder="State / Province"
                        name="state"
                        type="text"
                        onChange={handleChange}
                        value={formField.state}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-2 card-label">
                      <label>Country</label>
                      <input
                        placeholder="Country"
                        name="country"
                        type="text"
                        onChange={handleChange}
                        value={formField.country}
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
                      <label>Licence Number</label>
                      <input
                        placeholder="Licence Number"
                        name="license_number"
                        type="text"
                        onChange={handleChange}
                        value={formField.license_number}
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
                    <input
                      placeholder="field of speciality"
                      name="service"
                      type="text"
                      onChange={handleChange}
                      value={formField.service}
                      className="input-tags form-control"
                    />
                    <small className="form-text text-muted">
                      Note : Type & Press enter to add new services
                    </small>
                  </div>
                  <div className="form-group mb-2 card-label">
                    <label>Specialization</label>
                    <input
                      placeholder="Specialization"
                      name="specialization"
                      type="text"
                      onChange={handleChange}
                      value={formField.specialization}
                      className="input-tags form-control"
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
                      <label>Education level</label>
                      <input
                        placeholder="education_level"
                        name="type"
                        type="text"
                        onChange={handleChange}
                        value={formField.type}
                        className="input-tags form-control"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="form-group mb-2 card-label">
                      <label>College/Institute</label>

                      <input
                        placeholder="collage"
                        name="collage"
                        type="text"
                        onChange={handleChange}
                        value={formField.collage}
                        className="input-tags form-control"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="form-group mb-2 card-label">
                      <label>Year of Completion</label>

                      <input
                        placeholder="year_of_completion"
                        name="year_of_completion"
                        type="text"
                        onChange={handleChange}
                        value={formField.year_of_completion}
                        className="input-tags form-control"
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
                        placeholder="hospital_name"
                        name="hospital_name"
                        type="text"
                        onChange={handleChange}
                        value={formField.hospital_name}
                        className="input-tags form-control"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="form-group mb-2 card-label">
                      <label>From</label>

                      <input
                        placeholder="start_date"
                        name="start_date"
                        type="text"
                        onChange={handleChange}
                        value={formField.start_date}
                        className="input-tags form-control"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="form-group mb-2 card-label">
                      <label>To</label>
                      <input
                        placeholder="end_date"
                        name="end_date"
                        type="text"
                        onChange={handleChange}
                        value={formField.end_date}
                        className="input-tags form-control"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="form-group mb-2 card-label">
                      <label>Designation</label>
                      <input
                        placeholder="designation"
                        name="designation"
                        type="text"
                        onChange={handleChange}
                        value={formField.designation}
                        className="input-tags form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center my-3">
              <Button htmlType="submit" type="primary" size="large">
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DoctorProfileSetting;

/*
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


*/
