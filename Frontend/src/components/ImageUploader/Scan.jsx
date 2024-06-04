import { useEffect, useState } from "react";
import { message, Select } from "antd";
import Header from "../Shared/Header/Header";
import axios from "axios";

const Scan = () => {
  const [file, setFile] = useState(null);
  const [profileData, setProfileData] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [Data, setData] = useState([]);
  const [formData, setFormData] = useState({ clinical_record: null });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError(null);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Create preview URL
    } else {
      setFile(null);
      setPreviewUrl(null); // Clear preview URL
      setError("Please select a valid scan image (JPEG or PNG).");
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/clinical-record/"
        );
        const data = response.data;
        setProfileData(data);
      } catch (error) {
        console.error(
          "There was a problem fetching the profile data:",
          error.message
        );
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/machine-learning/"
        );
        const data = response.data;
        setData(data);
        console.log(data);
      } catch (error) {
        console.error(
          "There was a problem fetching the profile data:",
          error.message
        );
      }
    };

    fetchData();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/machine-learning/");
  //     const result = await response.json();

  //     setData(result);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }

  // };

  const handleUpload = async () => {
    if (file && formData.clinical_record) {
      const uploadData = new FormData();
      uploadData.append("image", file);
      uploadData.append("clinical_record", formData.clinical_record);

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/machine-learning/",
          {
            method: "POST",
            body: uploadData,
          }
        );

        if (response.ok) {
          message.success("Image uploaded successfully!");

          setFile(null);
          setPreviewUrl(null); // Clear preview URL
          setError(null);
          // fetchData(); // Fetch data after successful upload
        } else {
          const errorData = await response.json();
          console.error("Upload failed:", errorData);
          throw new Error("Failed to upload image");
        }
      } catch (error) {
        setError("Error uploading image: " + error.message);
      }
    } else {
      setError("Please select an image and clinical record to upload.");
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2 style={{ marginBottom: "20px", color: "#3487df" }}>
          Upload Your Image Here
        </h2>
        <div className="form-group">
          <label>Select clinical record:</label>
          <Select
            placeholder="Select clinical record for your patient"
            value={formData.clinical_record}
            onChange={(value) =>
              setFormData({ ...formData, clinical_record: value })
            }
          >
            {profileData.map((profile) => (
              <Select.Option key={profile.id} value={profile.id}>
                {profile.patient.first_name} {profile.patient.last_name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div
          style={{
            width: "80%",
            border: "2px solid #ccc",
            borderRadius: "10px",
            marginLeft: "10%",
            padding: "2px",
            marginBottom: "20px",
            backgroundColor: "#3487df",
          }}
        >
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            style={{
              display: "block",
              padding: "10px",
              cursor: "pointer",
              backgroundColor: "#fff",
              borderRadius: "5px",
            }}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: "80%", maxHeight: "200px" }}
              />
            ) : (
              <span style={{ color: "#999" }}>Click to select a file</span>
            )}
          </label>
        </div>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onClick={handleUpload}
        >
          Upload
        </button>
        {Data.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>Data from server:</h3>
            <ul>
              {Data.map((item, index) => (
                <li
                  key={index}
                  style={{ marginBottom: "20px", textAlign: "left" }}
                >
                  <div>
                    <strong>Result:</strong> {item.result}
                  </div>
                  <div>
                    <strong>Accuracy:</strong> {item.accuracy}%
                  </div>
                  <div>
                    <strong>Clinical Record ID:</strong>{" "}
                    {item.clinical_record_id}
                  </div>
                  {item.patient && (
                    <>
                      <div>
                        <strong>Patient Name:</strong> {item.patient.first_name}{" "}
                        {item.patient.last_name}
                      </div>
                      <div>
                        <strong>Patient Age:</strong> {item.patient.age}
                      </div>
                      <div>
                        <strong>Patient Gender:</strong> {item.patient.gender}
                      </div>
                      <div>
                        <strong>Patient Phone Number:</strong>{" "}
                        {item.patient.phone_number}
                      </div>
                      <div>
                        <strong>Patient Email:</strong> {item.patient.email}
                      </div>
                      <div>
                        <strong>Patient City:</strong> {item.patient.city}
                      </div>
                      <div>
                        <strong>Patient State:</strong> {item.patient.state}
                      </div>
                      <div>
                        <strong>Patient Country:</strong> {item.patient.country}
                      </div>
                    </>
                  )}
                  {item.clinical_record && (
                    <>
                      <div>
                        <strong>Family History:</strong>{" "}
                        {item.clinical_record.family_history}
                      </div>
                      <div>
                        <strong>Blood Type:</strong>{" "}
                        {item.clinical_record.blood_type}
                      </div>
                      <div>
                        <strong>Pregnancy Condition:</strong>{" "}
                        {item.clinical_record.pregnancy_condition
                          ? "Yes"
                          : "No"}
                      </div>
                      <div>
                        <strong>Symptoms:</strong>{" "}
                        {item.clinical_record.symptoms}
                      </div>
                      <div>
                        <strong>Symptoms Description:</strong>{" "}
                        {item.clinical_record.symptoms_description}
                      </div>
                      <div>
                        <strong>Disease Type:</strong>{" "}
                        {item.clinical_record.disease_type}
                      </div>
                      <div>
                        <strong>Disease Description:</strong>{" "}
                        {item.clinical_record.disease_description}
                      </div>
                      <div>
                        <strong>Follow Up Information:</strong>{" "}
                        {item.clinical_record.follow_up_information}
                      </div>
                      <div>
                        <strong>Allergies:</strong>{" "}
                        {item.clinical_record.allergies}
                      </div>
                      <div>
                        <strong>Vaccination Status:</strong>{" "}
                        {item.clinical_record.vaccination_status}
                      </div>
                      <div>
                        <strong>Sugar Level:</strong>{" "}
                        {item.clinical_record.sugar_level}
                      </div>
                      <div>
                        <strong>Blood Pressure:</strong>{" "}
                        {item.clinical_record.blood_pressure}
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Scan;
