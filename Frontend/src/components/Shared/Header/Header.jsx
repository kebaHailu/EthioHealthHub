import React, { useEffect, useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import loginService from "../../../service/auth.service";
import HeaderNav from "./HeaderNav";
import img from "../../../images/logo.png";
import avatar from "../../../images/avatar.jpg";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(true);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    setShow(currentScroll <= 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("user_role");
    if (token && userRole) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, []);

  const handleSignOut = () => {
    loginService.Logout();
    message.success("Successfully Logged Out");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_role");
    setIsLoggedIn(false);
    setRole(null);
    setOpen(false); // Close the nav popover if open
    navigate("/");
  };


  const content = (
    <div className="nav-popover">
      <div className="my-2">
        <h5 className="text-capitalize">{role}</h5>
        {role === "SD" && <Link to="/dashboard">Dashboard</Link>}
        {role === "HO" && <Link to="/admin/dashboard">Admin Dashboard</Link>}
        {role === "SA" && <Link to="/station-admin">Station Admin</Link>}
      </div>
      <Button
        variant="outline-danger"
        className="w-100"
        size="sm"
        onClick={handleSignOut}
      >
        Log Out
      </Button>
    </div>
  );

  return (
    <>
      <div
        className={`navbar navbar-expand-lg navbar-light ${
          !show && "hideTopHeader"
        }`}
      ></div>
      <header id="header" className={`fixed-top ${!show && "stickyHeader"}`}>
        <div className="container d-flex align-items-center">
          <Link to={"/"} className="logo me-auto">
            <img src={img} alt="" className="img-fluid" />
          </Link>
          <HeaderNav
            isLoggedIn={isLoggedIn}
            avatar={avatar}
            content={content}
            open={open}
            setOpen={setOpen}
          />
          <Link to={"/appointment"} className="appointment-btn scrollto">
            <span className="d-none d-md-inline">Make an</span> Appointment
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
