import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { FaHospitalUser, FaCalendarAlt, FaHospital } from "react-icons/fa";

const DoctorDashCard = () => {
  const [cardData, setCardData] = useState([
    {
      icon: <FaHospital className="icon" />,
      title: "Total Patient",
      amount: 0,
      date: "",
    },
    {
      icon: <FaHospitalUser className="icon active" />,
      title: "Prescription",
      amount: 0,
      date: "",
    },
    {
      icon: <FaCalendarAlt className="icon danger" />,
      title: "Appointments",
      amount: 0,
      date: "",
    },
  ]);

 useEffect(() => {
   const fetchData = async () => {
     try {
       const token = localStorage.getItem("accessToken");
       const response = await axios.get(
         "http://127.0.0.1:8000/specialist/dashboard",
         {
           headers: {
             Authorization: `JWT ${token}`,
           },
         }
       );
       const data = response.data;

       setCardData((prevCardData) => [
         {
           icon: <FaHospital className="icon" />,
           title: "Total Patient",
           amount: prevCardData[0].amount + data.total_patients,
           date: data.date,
         },
         {
           icon: <FaHospitalUser className="icon active" />,
           title: "Prescription",
           amount: prevCardData[1].amount + data.total_prescriptions,
           date: data.date,
         },
         {
           icon: <FaCalendarAlt className="icon danger" />,
           title: "Appointments",
           amount: prevCardData[2].amount + data.total_appointments,
           date: data.date,
         },
       ]);
     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };

   fetchData();
 }, []);


  return (
    <div className="row mb-4 p-3 rounded" style={{ background: "#f8f9fa" }}>
      {cardData.map((item, index) => (
        <div className="col-md-12 col-lg-4" key={index}>
          <div className="d-flex gap-2 align-items-center dash-card">
            <div className="dash-card-icon">{item.icon}</div>
            <div className="dash-widget-info">
              <h6 className="mb-0">{item.title}</h6>
              <h4 className="my-1">{item.amount}</h4>
              <p className="form-text">{item.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorDashCard;
