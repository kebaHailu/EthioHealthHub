import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const ImageUpload = ({ fileList, onFileChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      // Check if the selected file is not already present in the fileList
      if (!fileList.find((f) => f.name === file.name)) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage(reader.result);
          onFileChange(file); // Notify parent component about the selected file
        };
        reader.readAsDataURL(file);
      }
    }
  };



  return (
    <>
      <div className="change-photo-btn">
        <span className="d-flex align-items-center justify-content-center gap-2">
          <FaCloudUploadAlt className="icon" style={{ fontSize: "2rem" }} />{" "}
          Upload Photo
        </span>
        <input type="file" className="upload" onChange={handleFileChange} />
      </div>
      <div>
        <small className="form-text text-muted">
          Allowed JPG, GIF, or PNG. Max size of 2MB
        </small>
      </div>

      <div className="image-preview-container">
        {fileList?.map((file) => (
          <img
            key={file.uid}
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="image-preview"
          />
        ))}
      
      </div>
    </>
  );
};

export default ImageUpload;
