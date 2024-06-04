import React, { useEffect, useState } from "react";
import img from "../../../../images/avatar.jpg";
import { FaEye, FaCheck, FaTimes, FaBriefcaseMedical } from "react-icons/fa";
import { message, Button, Popconfirm } from "antd";
import CustomTable from "../../../UI/component/CustomTable";
import { Tabs } from "antd";
import moment from "moment";
import axios from "axios"; // Import Axios for making HTTP requests

const DashboardPage = () => {
  const [sortBy, setSortBy] = useState("upcoming");
  const [data, setData] = useState([]); // State to hold the fetched data
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/clinical-record/"
        );
        setData(response.data);
      } catch (error) {
        message.error("Failed to fetch data");
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);
  const handleDelete = (record) => {
    // Handle delete action here
    const updatedData = data.filter((item) => item.id !== record.id);
    setData(updatedData);
    message.success(`Deleted appointment with ID: ${record.id}`);
  };

  const handleOnselect = (value) => {
    setSortBy(value == 1 ? "upcoming" : value == 2 ? "today" : sortBy);
    // You may want to implement sorting logic here if needed
  };

  const handleAccept = (record) => {
    // Handle accept action here
    message.success(`Accepted appointment with ID: ${record.id}`);
  };



  const upcomingColumns = [
    {
      title: "Patient Name",
      dataIndex: "patient",
      key: "patient",
      width: 100,
      render: (patient) => (
        <div className="table-avatar">
          <a className="avatar avatar-sm mr-2 d-flex gap-2">
            <img className="avatar-img rounded-circle" src={img} alt="" />
            <div>
              <p className="p-0 m-0 text-nowrap">
                {patient?.first_name + " " + patient?.last_name}
              </p>
              {/* Add other patient details if needed */}
            </div>
          </a>
        </div>
      ),
    },
    {
      title: "App Date",
      dataIndex: "created_at",
      key: "created_at",
      width: 100,
      render: (createdAt) => (
        <div>
          {moment(createdAt).format("LL")}{" "}
          <span className="d-block text-info">
            {moment(createdAt).format("hh:mm A")}
          </span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => (
        <div>{status === "pending" ? "In Progress" : "Complete"}</div> // Updated dummy status data
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (record) => (
        <div className="d-flex gap-2">
          <Button
            type="primary"
            icon={<FaCheck />}
            size="medium"
            onClick={() => handleAccept(record)}
          >
            Accept
          </Button>
          <Popconfirm
            title="Are you sure to delete this appointment?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" icon={<FaTimes />} danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: "upcoming",
      children: (
        <CustomTable
          loading={isLoading}
          columns={upcomingColumns}
          dataSource={data}
          showPagination={true}
          pageSize={10}
          showSizeChanger={true}
        />
      ),
    },
    {
      key: "2",
      label: "today",
      children: (
        <CustomTable
          loading={isLoading}
          columns={upcomingColumns}
          dataSource={data}
          showPagination={true}
          pageSize={10}
          showSizeChanger={true}
        />
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={handleOnselect} />;
};

export default DashboardPage;
