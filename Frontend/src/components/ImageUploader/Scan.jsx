import { useEffect, useState } from "react";
import { message, Select, Modal, Button } from "antd";
import Header from "../Shared/Header/Header";
import axios from "axios";
import { toast } from "react-toastify";

const Scan = () => {
   const [, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [profileData, setProfileData] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [Data, setData] = useState([]);
  const [formData, setFormData] = useState({ clinical_record: null });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [tableVisible, setTableVisible] = useState(false); // State to manage table visibility

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError(null);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreviewUrl(null);
      setError("Please select a valid scan image (JPEG or PNG).");
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const Token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://127.0.0.1:8000/clinical_record/technician",
          {
            headers: {
              Authorization: `JWT ${Token}`,
            },
          }
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
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://127.0.0.1:8000/machine-learning-retrieve/",
          { headers: { Authorization: `JWT ${token}` } }
        );
        const data = response.data;
        setData(data);
        console.log(data);
      } catch (error) {
        console.error("There was a problem fetching the data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleUpload = async () => {
    if (file && formData.clinical_record) {
      const uploadData = new FormData();
      uploadData.append("image", file);
      uploadData.append("clinical_record", formData.clinical_record);
       setLoading(true);
       const toastId = toast.loading("uploading image to the model...");

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/machine-learning/",
          {
            method: "POST",
            body: uploadData,
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          message.success("Image uploaded successfully!");
          setFile(null);
          setPreviewUrl(null);
          setError(null);
         toast.dismiss(toastId);

          // Update modal data and show modal
          setModalData({
            result: responseData.result,
            accuracy: responseData.accuracy,
            imageUrl: previewUrl,
            patientName: `${responseData.patient.first_name} ${responseData.patient.last_name}`,
          });
          setModalVisible(true);
        } else {
          const errorData = await response.json();
          console.error("Upload failed:", errorData);
          throw new Error("Failed to upload image");
        }
      } catch (error) {
        setError("Error uploading image: " + error.message);
         toast.dismiss(toastId);
      }
    } else {
      setError("Please select an image and clinical record to upload.");
     
      setLoading(false);
   
    }
    
  }
  
  ;

  const handleToggleTable = () => {
    setTableVisible(!tableVisible);
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
        <Button
          style={{
            padding: "2px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            // marginTop: "20px",
            marginLeft: "750px",
            // float: "right", // Float the button to the right
          }}
          onClick={handleToggleTable}
        >
          {tableVisible ? "Hide Results" : "Show  previous records"}
        </Button>
        {tableVisible && Data.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>Data from server:</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Result
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Accuracy
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Patient Name
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Patient Age
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Patient Gender
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Blood Type
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Symptoms
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Symptoms Description
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Disease Type
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Disease Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {Data.map((item, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {item.result}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {item.accuracy}%
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {item.patient &&
                        `${item.patient.first_name} ${item.patient.last_name}`}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {item.patient && item.patient.age}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {item.patient && item.patient.gender}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {item.clinical_record && item.clinical_record.blood_type}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {item.clinical_record && item.clinical_record.symptoms}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {item.clinical_record &&
                        item.clinical_record.symptoms_description}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {item.clinical_record &&
                        item.clinical_record.disease_type}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {item.clinical_record &&
                        item.clinical_record.disease_description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal
        title="Upload Result"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        bodyStyle={{ backgroundColor: "#f7f7f7" }} // Light background for the modal body
      >
        {modalData && (
          <div>
            <p
              style={{
                backgroundColor: "#d4edda",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Result: {modalData.result}
            </p>
            <p
              style={{
                backgroundColor: "#cce5ff",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Accuracy: {modalData.accuracy}%
            </p>
            <p
              style={{
                backgroundColor: "#ffeeba",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Patient Name: {modalData.patientName}
            </p>
            {modalData.imageUrl && (
              <img
                src={modalData.imageUrl}
                alt="Uploaded"
                style={{
                  maxWidth: "100%",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
              />
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default Scan;
