import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./StationAdmin.css";
import Header from "../Shared/Header/Header";

const StationAdmin = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingTechnician, setEditingTechnician] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [stationInfo, setStationInfo] = useState({});
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    // Fetch station data
    fetchStationData();
  }, []);

  const fetchStationData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/station/");
      const data = await response.json();
      if (data.length > 0) {
        setStationInfo(data[0]); // Assuming data is an array and taking the first item
      }
    } catch (error) {
      console.error("Error fetching station data:", error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    setEditMode(false);
    // Send updated data to backend
    try {
      const formData = new FormData();
      formData.append("name", stationInfo.name);
      formData.append('user',stationInfo.user);
      formData.append("location", stationInfo.location);
      formData.append("latitude", stationInfo.latitude);
      formData.append("longitude", stationInfo.longitude);
      formData.append("description", stationInfo.description);
      formData.append("is_approved", stationInfo.is_approved);
      if (profileImage) {
        formData.append("cover_image", profileImage);
      }

      const response = await fetch(
        `http://127.0.0.1:8000/station/${stationInfo.id}/`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update station data");
      }
    } catch (error) {
      console.error("Error updating station data:", error);
    }
  };

  const handleEditTechnician = (record) => {
    setEditingTechnician(record);
    setVisible(true);
  };

  const handleDeleteTechnician = (record) => {
    setTechnicians(technicians.filter((tech) => tech !== record));
  };

  const handleAddTechnician = () => {
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    // Handle form submission
    setVisible(false);
  };

const handleAddTechnicianFormSubmit = async (values) => {
  try {
    // Get the logged-in station admin's ID from wherever it's stored
    // For example, if it's stored in stationInfo, you can access it like this
    const stationId = stationInfo.id;

    // Perform any form validation if needed

    // Create a new FormData object to handle file uploads if necessary
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("station_id", stationId);

    // Make a POST request to the specified URL
    const response = await fetch("http://127.0.0.1:8000/send_email", {
      method: "POST",
      body: formData, // Pass the FormData object as the body
    });

    // Check if the request was successful
    if (response.ok) {
      // If successful, get the response data
      const responseData = await response.json();

      // Update the technicians state with the new data
      setTechnicians([...technicians, responseData]);

      // Optionally, you can update state or perform any additional actions
      console.log(technicians);
      console.log("Technician added successfully!");
    } else {
      // If the request failed, log an error or handle it appropriately
      console.error("Failed to add technician:", response.statusText);
      // Optionally, you can display an error message to the user
    }
  } catch (error) {
    // If an error occurs during the request, log it or handle it appropriately
    console.error("Error adding technician:", error);
    // Optionally, you can display an error message to the user
  }
};


   const handleProfileImageChange = (e) => {
     const file = e.target.files[0];
     setProfileImage(file);
   };

  const columns = [
    
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    

    {
      title: "Registered Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined />}
            className="edit-button"
            onClick={() => handleEditTechnician(record)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            className="delete-button"
            onClick={() => handleDeleteTechnician(record)}
          />
        </span>
      ),
    },
  ];

  return (
    <>
    <Header/>
      <div className="station-admin-container">
        <div className="left-sidebar sticky">
          {/* Station Info */}
          <label htmlFor="profileImage">
            <img
              className="cover-image"
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : stationInfo.cover_image
              }
              alt="Station Cover"
            />
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfileImageChange}
            />
          </label>
          <p>
            <strong>Station Name:</strong>{" "}
            {editMode ? (
              <Input
                value={stationInfo.name}
                onChange={(e) =>
                  setStationInfo({ ...stationInfo, name: e.target.value })
                }
              />
            ) : (
              stationInfo.name
            )}
          </p>
          <p>
            <strong>Station Location:</strong>{" "}
            {editMode ? (
              <Input
                value={stationInfo.location}
                onChange={(e) =>
                  setStationInfo({ ...stationInfo, location: e.target.value })
                }
              />
            ) : (
              stationInfo.location
            )}
          </p>
          <p>
            <strong>Latitude:</strong>{" "}
            {editMode ? (
              <Input
                value={stationInfo.latitude}
                onChange={(e) =>
                  setStationInfo({ ...stationInfo, latitude: e.target.value })
                }
              />
            ) : (
              stationInfo.latitude
            )}
          </p>
          <p>
            <strong>Longitude:</strong>{" "}
            {editMode ? (
              <Input
                value={stationInfo.longitude}
                onChange={(e) =>
                  setStationInfo({ ...stationInfo, longitude: e.target.value })
                }
              />
            ) : (
              stationInfo.longitude
            )}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {editMode ? (
              <Input
                value={stationInfo.description}
                onChange={(e) =>
                  setStationInfo({
                    ...stationInfo,
                    description: e.target.value,
                  })
                }
              />
            ) : (
              stationInfo.description
            )}
          </p>
          <p>
            <strong>Verification Status:</strong>{" "}
            {editMode ? (
              <Input
                value={stationInfo.is_approved ? "Approved" : "Not Approved"}
                onChange={(e) =>
                  setStationInfo({
                    ...stationInfo,
                    is_approved: e.target.value === "Approved",
                  })
                }
              />
            ) : stationInfo.is_approved ? (
              "Approved"
            ) : (
              "Not Approved"
            )}
          </p>
          <p>
            <strong>Admin Name:</strong>{" "}
            {editMode ? (
              <Input
                value={stationInfo.adminName}
                onChange={(e) =>
                  setStationInfo({ ...stationInfo, adminName: e.target.value })
                }
              />
            ) : (
              stationInfo.adminName
            )}
          </p>
          {/* Add/Edit button */}
          {editMode ? (
            <Button onClick={handleSave} type="primary">
              Save
            </Button>
          ) : (
            <Button onClick={handleEdit}>Edit</Button>
          )}
        </div>
        <div className="right-sidebar">
          {/* Add Technician Button */}
          <Button onClick={handleAddTechnician}>Add Technician</Button>
          {/* Technicians Table */}
          <Table dataSource={technicians} columns={columns} />
        </div>
        {/* Add Technician Form */}
        <Modal
          title="Add Technician"
          visible={showAddForm}
          onCancel={() => setShowAddForm(false)}
          footer={null}
        >
          <Form onFinish={handleAddTechnicianFormSubmit}>
            <Form.Item
              label="Email"
              name="email"
              value={editingTechnician?.email}
              rules={[{ required: true, message: "Please input email" }]}
            >
              <Input />
            </Form.Item>

            <Button className="add-technician-button" htmlType="submit">
              Add Technician
            </Button>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default StationAdmin;
