import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import CustomTable from "../../UI/component/CustomTable";
import {
  Button,
  Tag,
  message,
  Modal,
  Form,
  Input,
  DatePicker,
  Switch,
} from "antd";
import { FaRegEye, FaEdit, FaRegTimesCircle } from "react-icons/fa";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import axios from "axios";

const Prescription = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://127.0.0.1:8000/prescription/specialist",
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    message.loading("Deleting ...");
    try {
      await axios.delete(`http://127.0.0.1:8000/prescription/${id}/`);
      setData(data.filter((item) => item.id !== id));
      message.success("Successfully Deleted !!");
    } catch (error) {
      message.error("Error deleting prescription");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleAddPrescription = async (values) => {
    try {
      const newPrescription = {
        prescription_medicine: values.prescription_medicine,
        follow_update: values.follow_update,
        archived: values.archived,
        appointment: values.appointment,
      };
      const response = await axios.post(
        "http://127.0.0.1:8000/prescription/",
        newPrescription
      );
      setData([response.data, ...data]);
      message.success("Prescription added successfully!");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding prescription:", error);
      message.error("Error adding prescription");
    }
  };

  const columns = [
    {
      title: "Appointment Id",
      dataIndex: "appointment",
      key: "appointment",
      render: (appointment) => <Tag color="#f50">{appointment}</Tag>,
    },
    {
      title: "Priscription medicine",
      dataIndex: "prescription_medicine",
      key: "prescription_medicine",
    },
    {
      title: "Follow-Update",
      dataIndex: "follow_update",
      key: "follow_update",
      render: (data) => (
        <Tag color="#87d068">{dayjs(data).format("MMM D, YYYY hh:mm A")}</Tag>
      ),
    },
    {
      title: "Archived",
      dataIndex: "archived",
      key: "archived",
      render: (archived) => (
        <Tag color={archived ? "#f50" : "#108ee9"}>
          {archived ? "Yes" : "Under Treatment"}
        </Tag>
      ),
    },
   
    {
      title: "Action",
      key: "action",
      render: (data) => (
        <div className="d-flex">
          <Link to={`/dashboard/prescription/${data.id}`}>
            <Button
              type="primary"
              size="small"
              className="bg-primary"
              style={{ margin: "5px 5px" }}
            >
              <FaRegEye />
            </Button>
          </Link>
          <Link to={`/dashboard/appointment/treatment/edit/${data.id}`}>
            <Button
              type="primary"
              size="small"
              className="bg-primary"
              style={{ margin: "5px 5px" }}
            >
              <FaEdit />
            </Button>
          </Link>
          <Button
            onClick={() => deleteHandler(data.id)}
            size="small"
            type="primary"
            style={{ margin: "5px 5px" }}
            danger
          >
            <FaRegTimesCircle />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div
        className="w-100 mb-3 rounded"
        style={{ background: "#f8f9fa", padding: "10px" }}
      >
        <Button
          type="primary"
          onClick={showModal}
          style={{ float: "right", marginBottom: "10px" }}
        >
          Add Prescription
        </Button>
        <CustomTable
          loading={isLoading}
          columns={columns}
          dataSource={data}
          showPagination={true}
          pageSize={20}
          showSizeChanger={true}
        />
      </div>
      <Modal
        title="Add Prescription"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddPrescription} layout="vertical">
          <Form.Item
            name="appointment"
            label="Appointment Id"
            rules={[
              { required: true, message: "Please input the appointment id!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="prescription_medicine"
            label="medicine"
            rules={[{ required: true, message: "Please input the disease!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="follow_update"
            label="Follow Update"
            rules={[
              { required: true, message: "Please select the follow-up date!" },
            ]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item name="archived" label="Archived" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Prescription
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
};

export default Prescription;
