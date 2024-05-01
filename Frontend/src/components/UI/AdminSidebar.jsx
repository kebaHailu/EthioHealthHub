import React from "react";
import "./AdminSidebar.css";
import { FaHome } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { FaPeopleArrows } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="menu-title">
              <span>
                <h5>Main</h5>
              </span>
            </li>
            <li className="active">
              <Link to={"/admin/dashboard"}>
                <FaHome /> <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={"/admin/appointments"}>
                <FaListUl /> <span>Appointments</span>
              </Link>
            </li>
            <li>
              <Link to={"/admin/specialites"}>
                <FaPeopleArrows /> <span>Specialities</span>
              </Link>
            </li>
            {/* <li>
              <Link to={"/doctors/profile/:id"}>
                <FaUserAstronaut /> <span>Doctors</span>
              </Link>
            </li> */}
            <li>
              <Link to={"/admin/patients"}>
                <FaRegUser /> <span>Patients List</span>
              </Link>
            </li>
            <li>
              <Link to={"/admin/addpatient"}>
                <FaUserAstronaut /> <span>Add Patient</span>
              </Link>
            </li>

            <li className="menu-title">{/* <span>Pages</span> */}</li>
            <li className="text-white"></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
