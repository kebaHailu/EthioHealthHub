import React, { useEffect, useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Steps, Button, message } from "antd";
import { DatePicker } from "antd";
import ImageUpload from "../../UI/form/ImageUpload";
import pImage from "../../../images/avatar.jpg";
import PatientCredentialsForm from "../../PatientCredentialsForm/PatientCredentialsForm";
import AdminLayout from "../../Admin/AdminLayout/AdminLayout";
import loginService from "../../../service/auth.service";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const { Step } = Steps;

const PatientProfileSetting = ({ data }) => {
  const { register, handleSubmit } = useForm({});
  const [selectValue, setSelectValue] = useState({});
  const [date, setDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const[profileData,setProfileData]=useState(null)
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);

  console.log(decoded.user_id);


  const [formField, setFormField] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    phone_number: "",
    //  date_of_birth: moment().format("YYYY-MM-DD"), // Initialize date_of_birth with current date in "MM-DD-YYYY"
    gender: "",
    city: "",
    state: "",
    country: "",
  });

  const onChange = (date, dateString) => {
    setDate(moment(dateString).format());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField({ ...formField, [name]: value });
  };
  const onSubmit = async (e, data) => {
   
      e.preventDefault();
      const combinedFormData = { ...formField, ...data };
      try {
        const response = await loginService.PatientProfile(combinedFormData);
        message.success("Profile updated successfully!");
        console.log("response", combinedFormData);
      } catch (error) {
        console.error("Error updating profile:", error);
        message.error("Failed to update profile. Please try again.");
      }
  };

  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken')
       
        // Make the HTTP request using Axios
        const response = await axios.get(
          'http://127.0.0.1:8000/patient/',{
            headers: {
              Authorization: `JWT ${token}`,
            }
          }
        );
        // Extract the data from the response
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
            <form
              className="row form-row"
              style={{ marginBottom: "0px" }}
              onSubmit={onSubmit}
              onChange={handleChange}
            >
              

              <div className="col-md-6">
                <div
                  className="form-group mb-2 card-label"
                  style={{ marginBottom: "-60px" }}
                >
                  <label>
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    placeholder="First Name"
                    name="first_name"
                    type="text"
                    onChange={handleChange}
                    value={formField.first_name}
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
                    placeholder="Last Name"
                    name="last_name"
                    type="text"
                    onChange={handleChange}
                    value={formField.last_name}
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
                    placeholder="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={formField.email}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label>
                    Age <span className="text-danger">*</span>
                  </label>
                  <input
                    placeholder="age"
                    name="age"
                    type="number"
                    onChange={handleChange}
                    value={formField.age}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label>Phone Number</label>
                  <input
                    placeholder="Phone Number"
                    name="phone_number"
                    type="number"
                    onChange={handleChange}
                    value={formField.phone_number}
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
                    value={formField.gender}
                    name="gender"
                  >
                    <option value="">Select</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mb-2">
                  <label className="form-label">City</label>
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
                  <label>State</label>
                  <input
                    placeholder="State"
                    name="state"
                    type="text"
                    onChange={handleChange}
                    onchange={formField.state}
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
    <div style={{ marginBootom: "0px" }}>
      <AdminLayout>
        <Steps current={currentStep}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[currentStep].content} </div>
        <div className="steps-action">
          {currentStep < steps.length - 1 && (
            <Button
              style={{ marginLeft: "908px", marginTop: "0px" }}
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
      </AdminLayout>
    </div>
  );
};

export default PatientProfileSetting;
