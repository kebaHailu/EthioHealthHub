import React, { useState, useEffect } from "react";
import { Modal, Form, message, Input, Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./StationAdmin.css";
import Header from "../Shared/Header/Header";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Footer from "../Shared/Footer/Footer";
import { toast } from "react-toastify";

const StationAdmin = () => {
  const [, setLoading]=useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingTechnician, setEditingTechnician] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [stationInfo, setStationInfo] = useState(
    JSON.parse(localStorage.getItem("stationInfo")) || {}
  );
  const [technicians, setTechnicians] = useState([]);
  const token = localStorage.getItem("accessToken");
  const user = token ? jwtDecode(token).user_id : null;

  useEffect(() => {
    if (!stationInfo || Object.keys(stationInfo).length === 0) {
      fetchStationData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("stationInfo", JSON.stringify(stationInfo));
  }, [stationInfo]);

  const fetchStationData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/station/profile/",
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      console.log("Response data:", response.data);
      setStationInfo(response.data);
      setformData(response.data);
      setProfileImage(response.data);
    } catch (error) {
      console.error("Error fetching station data:", error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    setEditMode(false);
    try {
      const formData = new FormData();
      formData.append("name", stationInfo.name);
      formData.append("cover_image", profileImage);
      formData.append("location", stationInfo.location);
      formData.append("latitude", stationInfo.latitude);
      formData.append("longitude", stationInfo.longitude);
      formData.append("description", stationInfo.description);
      formData.append("user", user);

      const response = await axios.put(
        "http://127.0.0.1:8000/station/profile/",
        formData,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );

      const updatedData = response.data;
      setStationInfo(updatedData);
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
    setVisible(false);
  };

  useEffect(() => {
    if (!stationInfo || Object.keys(stationInfo).length === 0) {
      fetchStationData();
    }
    fetchTechniciansData();
  }, []);

  const fetchTechniciansData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/technician/", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      console.log("Technicians data:", response.data);
      setTechnicians(response.data);
    } catch (error) {
      console.error("Error fetching technicians data:", error);
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Registered Date",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    // },
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

  const handleAddTechnicianFormSubmit = async (values) => {
    try {
      const stationId = stationInfo.id;

      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("station_id", stationId);
      setLoading(true);
      const toastId = toast.loading("Registering local physician...");

      const response = await axios.post(
        "http://127.0.0.1:8000/send_email",
        formData,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );

      const responseData = response.data;
      setTechnicians([...technicians, responseData]);
      message.success("Technician added successfully!");
      toast.dismiss(toastId);
    } catch (error) {
      console.error("Error adding technician:", error);
      message.error("Failed to add technician!");
      
    }
    
  };
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  return (
    <>
      <Header />
      <div className="station-admin-container">
        <div
          className="left-sidebar sticky"
          style={{ marginLeft: "30px", marginRight: "30px" }}
        >
          <label htmlFor="profileImage">
            <img
              className="cover-image"
              src={`http://localhost:8000/${stationInfo.cover_image}`}
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
          <Button onClick={handleAddTechnician}>Add Local Physician</Button>
          {/* Technicians Table */}
          <Table dataSource={technicians} columns={columns} />
        </div>
        {/* Add Technician Form */}
        <Modal
          title="Add Local Physichan"
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
              Add Local Physichan
            </Button>
          </Form>
        </Modal>
      </div>
      <div style={{ marginTop: "40px" }}>
        <Footer />
      </div>
    </>
  );
};

export default StationAdmin;
