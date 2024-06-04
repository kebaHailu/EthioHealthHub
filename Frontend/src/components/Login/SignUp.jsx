import React, { useEffect, useState } from "react";
import { FaCheck, FaEnvelope, FaLock, FaTimes, FaUser } from "react-icons/fa";
import SocialSignUp from "./SocialSignUp";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "./SignInForm.css";
import swal from "sweetalert";
import { toast } from "react-toastify";
import loginService from "../../service/auth.service";

const SignUp = () => {
  const Navigate = useNavigate();
  const [error, setError] = useState({});
  const [infoError, setInfoError] = useState("");
  const [loading, setLoading] = useState(false);

  const [userType, setUserType] = useState("specialist doctor");
  const formField = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    user_role: "",
  };
  const [user, setUser] = useState(formField);

  const [passwordValidation, setPasswordValidation] = useState({
    carLength: false,
    specailChar: false,
    upperLowerCase: false,
    numeric: false,
  });

  const [emailError, setEmailError] = useState({
    emailError: false,
  });

  const handleEmailError = (name, value) => {
    if (name === "email") {
      setEmailError({
        emailError: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      });
    }
  };
  const hanldeValidation = (name, value) => {
    if (name === "password") {
      setPasswordValidation({
        carLength: value.length > 8,
        specailChar: /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value),
        upperLowerCase: /^(?=.*[a-z])(?=.*[A-Z])/.test(value),
        numeric: /^(?=.*\d)/.test(value),
      });
    }
  };

  const hanldeOnChange = (e) => {
    let { name, value } = e.target;
    hanldeValidation(name, value);
    handleEmailError(name, value);
    let isPassValid = true;

    if (value === "email") {
      isPassValid = /\S+@\S+\.\S+/.test(value);
    }
    if (value === "password") {
      isPassValid =
        value.length > 8 &&
        /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value) &&
        /^(?=.*[a-z])(?=.*[A-Z])/.test(value) &&
        /^(?=.*\d)/.test(value);
    }
    if (isPassValid) {
      const newPass = { ...user };
      newPass[name] = value;
      setUser(newPass);
    }
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    const newUser = { ...user };
    newUser.user_role = e.target.value;
    setUser(newUser);
  };

  const hanldeOnSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log(user);

    try {
      const response = await loginService.Signup(user);
      console.log(response);
      if (response.status === 201) {
        toast.success("Successfully registered");
        Navigate("/login");
        console.log("successfuly sent", response);
      }
    } catch (error) {
      console.log("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="sign-up-form" onSubmit={hanldeOnSubmit}>
      <h2 className="title" type='primary'>Sign Up</h2>

      <div className="input-field">
        <span className="fIcon">
          <FaUser />
        </span>
        <input
          placeholder="First Name"
          name="first_name"
          type="text"
          className="first_name"
          onChange={hanldeOnChange}
          value={user.first_name}
        />
      </div>
      <div className="input-field">
        <span className="fIcon">
          <FaUser />
        </span>
        <input
          placeholder="Last Name"
          name="last_name"
          type="text"
          onChange={hanldeOnChange}
          value={user.last_name}
        />
      </div>
      <div className="input-field">
        <span className="fIcon">
          <FaUser />
        </span>
        <input
          placeholder="User name"
          name="username"
          type="text"
          onChange={hanldeOnChange}
          value={user.username}
        />
      </div>
      <div className="input-field">
        <span className="fIcon">
          <FaEnvelope />
        </span>
        <input
          placeholder="Email"
          name="email"
          type="email"
          onChange={(e) => hanldeOnChange(e)}
          value={user.email}
        />
      </div>
      <div className="input-field">
        <span className="fIcon">
          <FaLock />
        </span>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => hanldeOnChange(e)}
          value={user.password}
        />
      </div>
      <div className="input-field d-flex align-items-center gap-2 justify-content-center">
        <div className="text-nowrap">I'M A</div>
        <select
          className="form-select w-50"
          aria-label="select"
          onChange={(e) => handleUserTypeChange(e)}
          defaultValue="patient"
        >
          {/* <option value="HO">Health Officer</option> */}
          <option value="SD">Specialist Doctor</option>
          <option value="SA">station Admin</option>
        </select>
      </div>
      {error.length && <h6 className="text-danger text-center">{error}</h6>}
      {infoError && <h6 className="text-danger text-center">{infoError}</h6>}
      <button
        type="submit"
       
        className="iBtn"
        disabled={
          passwordValidation.carLength &&
          passwordValidation.numeric &&
          passwordValidation.upperLowerCase &&
          passwordValidation.specailChar &&
          emailError.emailError
            ? ""
            : true
        }
      >
        {loading ? <Spinner animation="border" variant="info" /> : "Sign Up"}
      </button>

      <div className="password-validatity mx-auto">
        <div
          style={emailError.emailError ? { color: "green" } : { color: "red" }}
        >
          <p>
            {passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
            <span className="ms-2">Must Have Valid Email.</span>
          </p>
        </div>

        <div
          style={
            passwordValidation.carLength ? { color: "green" } : { color: "red" }
          }
        >
          <p>
            {passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
            <span className="ms-2">Password Must Have atlast 8 character.</span>
          </p>
        </div>

        <div
          style={
            passwordValidation.specailChar
              ? { color: "green" }
              : { color: "red" }
          }
        >
          <p>
            {passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
            <span className="ms-2">Password Must Have a special cracter.</span>
          </p>
        </div>

        <div
          style={
            passwordValidation.upperLowerCase
              ? { color: "green" }
              : { color: "red" }
          }
        >
          <p>
            {passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
            <span className="ms-2">
              Password Must Have uppercase and lower case.
            </span>
          </p>
        </div>

        <div
          style={
            passwordValidation.numeric ? { color: "green" } : { color: "red" }
          }
        >
          <p>
            {passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
            <span className="ms-2">Password Must Have Number.</span>
          </p>
        </div>
      </div>

      <p className="social-text">Or Sign up with social account</p>
      <SocialSignUp />
    </form>
  );
};

export default SignUp;
