import { useState } from "react";
import { message, Select, Modal, Button } from "antd";
import Header from "../Shared/Header/Header";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorScan = () => {
const [, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ diseaseType: null });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png","image/jpg"];
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

  const handleUpload = async () => {
    if (file && formData.diseaseType) {
      const uploadData = new FormData();
      uploadData.append("image", file);
      uploadData.append("diseaseType", formData.diseaseType);
        setLoading(true);
        const toastId = toast.loading("uploading image to the model...");

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/machine_learning_test",
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

          setModalData({
            result: responseData.result,
            accuracy: responseData.accuracy,
            imageUrl: previewUrl,
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
      setError("Please select an image and disease type to upload.");
      setLoading(false)
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
          <label>Select Disease Type:</label>
          <Select
            placeholder="Select Disease Type"
            value={formData.diseaseType}
            onChange={(value) =>
              setFormData({ ...formData, diseaseType: value })
            }
          >
            <Select.Option value="E">Eye</Select.Option>
            <Select.Option value="S">Skin</Select.Option>
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
      </div>
      <Modal
        title="Upload Result"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        bodyStyle={{ backgroundColor: "#f7f7f7" }}
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

export default DoctorScan;
