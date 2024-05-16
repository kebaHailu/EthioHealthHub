import React, { useState } from "react";
import { Modal, Form, Input, Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./StationAdmin.css";

const StationAdmin = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingTechnician, setEditingTechnician] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const [stationInfo, setStationInfo] = useState({
    name: "XYZ Station",
    location: "XYZ Location",
    verificationStatus: "Verified",
    adminName: "John Doe",
    coverImage: "https://via.placeholder.com/220", // Add coverImage
  });
  const [technicians, setTechnicians] = useState([]);

  const columns = [
    {
      title: "Technician Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Education",
      dataIndex: "education",
      key: "education",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Registred Date",
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

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
    // Update station info
    // You can send updated data to backend or update state based on your requirements
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

  const handleAddTechnicianFormSubmit = (values) => {
    const newTechnician = {
      ...values,
      createdAt: new Date().toLocaleString(),
    };
    setTechnicians([...technicians, newTechnician]);
    setShowAddForm(false);
  };

    const handleProfileImageChange = (e) => {
      const file = e.target.files[0];
      setProfileImage(file);
    };

  return (
    <div className="station-admin-container">
      <div className="left-sidebar sticky">
        {/* Station Info */}
        <label htmlFor="profileImage">
          <img className="cover-image"
            src={
              profileImage
                ? URL.createObjectURL(profileImage)
                : "https://via.placeholder.com/220"
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
          <strong>Verification Status:</strong>{" "}
          {editMode ? (
            <Input
              value={stationInfo.verificationStatus}
              onChange={(e) =>
                setStationInfo({
                  ...stationInfo,
                  verificationStatus: e.target.value,
                })
              }
            />
          ) : (
            stationInfo.verificationStatus
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
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please input first name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please input last name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input phone number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Education"
            name="education"
            rules={[{ required: true, message: "Please input education" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input age" }]}
          >
            <Input />
          </Form.Item>
          <Button className="add-technician-button" htmlType="submit">
            Add Technician
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
export default StationAdmin;