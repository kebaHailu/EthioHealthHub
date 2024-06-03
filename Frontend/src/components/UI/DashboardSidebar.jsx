import React, { useEffect, useState } from "react";
import img from "../../images/avatar.jpg";
import "./DashboardSidebar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaTable,
  FaCalendarDay,
  FaUserInjured,
  FaUserCog,
  FaSignOutAlt,
  FaLock,
} from "react-icons/fa";
import axios from "axios";

const DashboardSidebar = () => {
  const [profileData, setProfileData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://127.0.0.1:8000/specialist/profile/",
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );

        setProfileData(response.data);
        console.log("Profile Data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_role");
    navigate("/");
  };

  const role = "doctor"; // This should ideally come from your auth context or a similar state management system

  return (
    <div className="profile-sidebar p-3 rounded">
      <div className="p-2 text-center border-bottom">
        <div className="profile-info text-center">
          <Link to={"/"}>
            <img
              src={`http://127.0.0.1:8000/${profileData?.profile_picture}`}
              alt="Profile"
            />
          </Link>
          <div className="profile-details">
            <h5 className="mb-0">
              {profileData?.first_name ? profileData.first_name : "First Name"}
              {profileData?.last_name
                ? ` ${profileData.last_name}`
                : " Last Name"}
            </h5>
          </div>
        </div>
      </div>
      <nav className="dashboard-menu">
        {role === "patient" ? (
          <ul>
            <li>
              <NavLink to={"/dashboard"} activeClassName="active" end>
                <FaTable className="icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/profile-setting"}
                activeClassName="active"
              >
                <FaUserCog className="icon" />
                <span>Profile Settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/change-password"}
                activeClassName="active"
              >
                <FaLock className="icon" />
                <span>Change Password</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/"} onClick={handleLogout}>
                <FaSignOutAlt className="icon" />
                <span>Logout</span>
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to={"/dashboard"} activeClassName="active" end>
                <FaTable className="icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/appointments"}
                activeClassName="active"
                end
              >
                <FaCalendarDay className="icon" />
                <span>Appointments</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/my-patients"}
                activeClassName="active"
                end
              >
                <FaUserInjured className="icon" />
                <span>My Patients</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/prescription"}
                activeClassName="active"
                end
              >
                <FaUserInjured className="icon" />
                <span>Prescription</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/schedule"} activeClassName="active" end>
                <FaCalendarDay className="icon" />
                <span>Schedule Timings</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/profile-setting"}
                activeClassName="active"
                end
              >
                <FaUserCog className="icon" />
                <span>Profile Settings</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/scan"} activeClassName="active" end>
                <FaLock className="icon" />
                <span>upload Image</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/dashboard/change-password"}
                activeClassName="active"
                end
              >
                <FaLock className="icon" />
                <span>Change Password</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/"} onClick={handleLogout}>
                <FaSignOutAlt className="icon" end />
                <span>Logout</span>
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
