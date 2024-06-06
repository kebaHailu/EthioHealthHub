import React from "react";
import "./AdminSidebar.css";
import { FaHome } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { FaPeopleArrows } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaUserAstronaut, FaSignOutAlt } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { FaUpload } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

import { FaRegStar } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_role");
    navigate("/");
  };
  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                {/* <span>
                  <strong>Main</strong>
                </span> */}
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
                <Link to={"/technician"}>
                  <FaUserAstronaut /> <span>my profile</span>
                </Link>
              </li>
              <li></li>
              <li>
                <Link to={"/admin/addpatient"}>
                  <IoMdPersonAdd /> <span>Add Patient</span>
                </Link>
              </li>
              <li>
                <Link to={"/scan"}>
                  <FaUpload /> <span>Upload Image </span>
                </Link>
              </li>
              <li>
                <Link to={"/doctors"}>
                  <CiCirclePlus /> <span>Make Appointment </span>
                </Link>
              </li>

              <li>
                <NavLink to={"/"} onClick={handleLogout}>
                  <FaSignOutAlt className="icon" />
                  <span>Logout</span>
                </NavLink>
              </li>

              <li className="menu-title">{/* <span>Pages</span> */}</li>
              <li className="text-white"></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
