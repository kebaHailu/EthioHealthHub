import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import SocialSignUp from "./SocialSignUp";
import { FaUser } from "react-icons/fa";
import "./SignInForm.css";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { Toast } from "react-bootstrap";
import { toast } from "react-toastify";
import loginService from "../../service/auth.service";

const SignIn = ({ handleResponse }) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [infoError, setInfoError] = useState("");
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [forgotEmail, setForgotEmail] = useState("");

  const formField = {
    username: "",
    password: "",
  };
  const [user, setUser] = useState(formField);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 10000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("User:", user);
    try {
      const response = await loginService.logIn(user);
      if (response.status === 200) {
        const { access } = response.data; // Extract access token from response
        localStorage.setItem("accessToken", access); // Save access token to localStorage
        toast.success("Successfully logged in");
        navigate("/");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
   
    setShowForgotPassword(false);
  };

  const handleShowForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  return (
    <>
      {showForgotPassword ? (
        <form className="sign-in-form" onSubmit={handleForgotPasswordSubmit}>
          <h2 className="title">Forgot Password</h2>
          <div>To reset your password, please enter your email:</div>
          <div className="input-field">
            <span className="fIcon">
              <FaEnvelope />
            </span>
            <input
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter Your Email"
              type="email"
              required
            />
          </div>
          <div
            onClick={handleShowForgotPassword}
            className="text-bold"
            style={{ cursor: "pointer", color: "#32de8b" }}
          >
            Still remember your password?
          </div>
        </form>
      ) : (
        <form className="sign-in-form" onSubmit={handleLoginSubmit}>
          <Toast
            show={show}
            onClose={() => setShow(!show)}
            className="signInToast"
          >
            {/* <Toast.Header>
              <strong className="mr-auto">Demo credentials</strong>
            </Toast.Header>
            <Toast.Body>
              Use the following account to sign in as a doctor: <br />
              <hr />
              <div className="bg-dark text-white p-2 px-3 rounded">
                Email: lala <br />
                Password: 123456 <br />
              </div>
              <hr />
              <div className="bg-success p-2 rounded text-white">
                Please do not abuse this facility.
              </div>
            </Toast.Body> */}
          </Toast>
          <h2 className="title">Sign in</h2>
          <div className="input-field">
            <span className="fIcon">
              <FaUser />
            </span>
            <input
              placeholder="User name"
              name="username"
              type="text"
              onChange={handleInputChange}
              value={user.username}
            />
          </div>
          <div className="input-field">
            <span className="fIcon">
              <FaLock />
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={user.password}
            />
          </div>
          {infoError && <p className="text-danger">{infoError}</p>}
          <div
            onClick={handleShowForgotPassword}
            className="text-bold"
            style={{ cursor: "pointer", color: "#32de8b" }}
          >
            Forgot Password?
          </div>
          <button className="iBtn" type="submit">
            {loading ? (
              <Spinner animation="border" variant="info" />
            ) : (
              "Sign In"
            )}
          </button>
          <p className="social-text">Or sign in with social platforms</p>
          <SocialSignUp handleResponse={handleResponse} />
        </form>
      )}
    </>
  );
};

export default SignIn;
