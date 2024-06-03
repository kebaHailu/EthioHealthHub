import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./StationAdmin.css";
import AdminLayout from "../Admin/AdminLayout/AdminLayout";
import { jwtDecode } from "jwt-decode";

const StationAdmin = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [visible, setVisible] = useState(false);
  const [technicians, setTechnicians] = useState([]);
  const token = localStorage.getItem("accessToken");

  const decoded = jwtDecode(token);

  console.log(decoded.user_id);
  useEffect(() => {
    // Fetch technician data
    fetchTechnicianData();
  }, []);

  const fetchTechnicianData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://127.0.0.1:8000/technician/${decoded.user_id}/`,

        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
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
    try {
      // Assuming you have the technician ID stored in the values object
      const technicianId = values.id;

      // Create a new FormData object to handle the form data
      const formData = new FormData();
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("email", values.email);
      formData.append("phone_number", values.phone_number);
      formData.append("specialization", values.specialization);
      formData.append("age", values.age);
      formData.append("education", values.education);
      // formData.append("registered_date", values.registered_date);

      // Make a PUT request to update the technician data
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://127.0.0.1:8000/technician/${decoded.user_id}/`,

        {
          method: "PUT",
          body: formData,

          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );

      if (response.ok) {
        // If successful, update the technician data in the state
        const updatedTechnician = await response.json();
        setTechnicians([updatedTechnician]);
        setShowAddForm(false);
      } else {
        console.error("Failed to update technician data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating technician data:", error);
    }
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
      dataIndex: "phone_number",
      key: "phone",
    },
    {
      title: "Education",
      dataIndex: "education",
      key: "education",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      type: "number",
    },
    // {
    //   title: "Registered Date",
    //   dataIndex: "registered_date",
    //   key: "registered_date",
    //   type: "date",
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

  return (
    <div className="station-admin-container">
      <AdminLayout>
        <div className="right-sidebar">
          {/* Add Technician Button */}
          <Button onClick={handleAddTechnician}>my Profile</Button>
          {/* Technicians Table */}
          <Table dataSource={technicians} columns={columns} />
        </div>
      </AdminLayout>
      {/* Add Technician Form */}
      <Modal
        title="lets add my profile"
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
            name="phone_number"
            rules={[{ required: true, message: "Please input phone number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
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
            label="Specialization"
            name="specialization"
            rules={[{ required: true, message: "Please input specialization" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input age" }]}
          >
            <Input type="number" />
          </Form.Item>
          {/* <Form.Item
            label="Registered Date"
            name="registered_date"
            type="date"
            rules={[
              { required: true, message: "Please input registered date" },
              <Input type="date" />,
            ]}
          >
            <Input />
          </Form.Item> */}
          <Button className="add-technician-button" htmlType="submit">
            Add Local Physician
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default StationAdmin;
