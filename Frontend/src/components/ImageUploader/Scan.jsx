import { useState } from "react";
import {

  message
 
} from "antd";
const Scan = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    const allowedTypes = ["image/jpeg", "image/png"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError(null);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Create preview URL
    } else {
      setFile(null);
      setPreviewUrl(null); // Clear preview URL
      setError("Please select a valid  scan image (JPEG or PNG).");
    }
  };

  const handleUpload = () => {
    if (file) {
      // Here, you can handle the file upload directly within the component
      console.log("Uploading file:", file);
      message.success("image uploaded  successfully!");
      // Example: Send the file to a server or perform any necessary actions
      setFile(null);
      setPreviewUrl(null); // Clear preview URL
      setError(null);
    } else {
      setError("Please select an  image to upload.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>
        Upload Your Image Here
      </h2>
      <div
        style={{
          width: "80%",
          border: "2px  solid #ccc",
          borderRadius: "10px",
          marginLeft: "10%",

          padding: "20px",

          marginBottom: "20px",
          backgroundColor: "green",
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
  );
};

export default Scan;
