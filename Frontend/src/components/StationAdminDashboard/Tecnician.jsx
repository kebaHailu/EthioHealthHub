import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./StationAdmin.css";
import AdminLayout from "../Admin/AdminLayout/AdminLayout";

const StationAdmin = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [visible, setVisible] = useState(false);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    // Fetch technician data
    fetchTechnicianData();
  }, []);

  const fetchTechnicianData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/technician/10/");
      const data = await response.json();
      if (data) {
        // Assuming the response is an object with technician data
        setTechnicians([data]); // Set the technician data in the state
      }
    } catch (error) {
      console.error("Error fetching technician data:", error);
    }
  };

  const handleEditTechnician = (record) => {
    // Handle edit technician functionality
    setVisible(true);
  };

  const handleDeleteTechnician = (record) => {
    // Handle delete technician functionality
    setTechnicians([]);
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
    // Handle form submission for adding a new technician
    // Send a POST request to add the new technician
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => `${record.first_name} ${record.last_name}`,
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
      title: "Registered Date",
      dataIndex: "registered_date",
      key: "registered_date",
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
    <div className="station-admin-container">
      <AdminLayout>
        <div className="right-sidebar">
          {/* Add Technician Button */}
          <Button onClick={handleAddTechnician}>Add Technician</Button>
          {/* Technicians Table */}
          <Table dataSource={technicians} columns={columns} />
        </div>
      </AdminLayout>
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
            name="first_name"
            rules={[{ required: true, message: "Please input first name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
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
            label="Registered Date"
            name="registered_date"
            rules={[
              { required: true, message: "Please input registered date" },
            ]}
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
