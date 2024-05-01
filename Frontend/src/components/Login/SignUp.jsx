import React, { useEffect, useState } from 'react';
import { FaCheck, FaEnvelope, FaLock, FaTimes, FaUser } from 'react-icons/fa';
import SocialSignUp from './SocialSignUp';
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import swal from 'sweetalert';
import { useDoctorSignUpMutation, usePatientSignUpMutation } from '../../redux/api/authApi';
import { message } from 'antd';




const SignUp = () => {
    const Navigate =useNavigate();
    const [error, setError] = useState({});
    const [infoError, setInfoError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const [userType, setUserType] = useState("patient");
    const formField = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: userType === "doctor" ? "doctor" : "patient",
    };
    const [user, setUser] = useState(formField)
   
    // const [doctorSignUp, { data: dData, isSuccess: dIsSuccess, isError: dIsError, error: dError, isLoading: dIsLoading }] = '';
    // const [patientSignUp, { data: pData, isSuccess: pIsSuccess, isError: pIsError, error: pError, isLoading: pIsLoading }] = '';
    const [passwordValidation, setPasswordValidation] = useState({
        carLength: false,
        specailChar: false,
        upperLowerCase: false,
        numeric: false
    })

    // const handleSignUpSuccess = () => {
    //     setLoading(false);
    //     setUser(formField)
    // }

     useEffect(() => {
       setUser((prevUser) => ({
         ...prevUser,
         role: userType === "doctor" ? "doctor" : "patient",
       }));
     }, [userType]);
  

    const [emailError, setEmailError] = useState({
        emailError: false
    })

    const handleEmailError = (name, value) => {
        if (name === 'email') {
            setEmailError({
                emailError: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            })
        }
    }
    const hanldeValidation = (name, value) => {
        if (name === 'password') {
            setPasswordValidation({
                carLength: (value.length > 8),
                specailChar: /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value),
                upperLowerCase: /^(?=.*[a-z])(?=.*[A-Z])/.test(value),
                numeric: /^(?=.*\d)/.test(value),
            })
        }
    }

    const hanldeOnChange = (e) => {
        let { name, value } = e.target;
        hanldeValidation(name, value)
        handleEmailError(name, value)
        let isPassValid = true;

        if (value === 'email') {
            isPassValid = /\S+@\S+\.\S+/.test(value);
        }
        if (value === 'password') {
            isPassValid = ((value.length > 8)
                && /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value)
                && /^(?=.*[a-z])(?=.*[A-Z])/.test(value)
                && /^(?=.*\d)/.test(value))
        }
        if (isPassValid) {
            const newPass = { ...user };
            newPass[name] = value
            setUser(newPass)
        }
    }

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    }
    const hanldeOnSubmit = async (e) => {
        e.preventDefault();
        
        console.log(user)
        // setLoading(true);
        if (userType === "doctor") {
            doctorSignUp(user);
        } else {
            
            patientSignUp(user)
        }

        try{
            const response =await AuthService.Signup(user);
            if(response.status === 201){
                swal("Success", "User Created Successfully", "success");
                Navigate('/login');
            }
        }
        catch(error){
            console.Error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    return (
      <form className="sign-up-form" onSubmit={hanldeOnSubmit}>
        <h2 className="title">Sign Up</h2>
        <div className="input-field">
          <span className="fIcon">
            <FaUser />
          </span>
          <input
            placeholder="First Name"
            name="firstName"
            type="text"
            onChange={(e) => hanldeOnChange(e)}
            value={user.firstName}
          />
        </div>
        <div className="input-field">
          <span className="fIcon">
            <FaUser />
          </span>
          <input
            placeholder="Last Name"
            name="lastName"
            type="text"
            onChange={(e) => hanldeOnChange(e)}
            value={user.lastName}
          />
        </div>
        <div className="input-field">
          <span className="fIcon">
            <FaUser />
          </span>
          <input
            placeholder="User name"
            name="userName"
            type="text"
            onChange={(e) => hanldeOnChange(e)}
            value={user.userName}
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
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
        {error.length && <h6 className="text-danger text-center">{error}</h6>}
        {infoError && <h6 className="text-danger text-center">{infoError}</h6>}
        <button
          type="submit"
          className="btn btn-success btn-block mt-2 iBtn"
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
            style={
              emailError.emailError ? { color: "green" } : { color: "red" }
            }
          >
            <p>
              {passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
              <span className="ms-2">Must Have Valid Email.</span>
            </p>
          </div>

          <div
            style={
              passwordValidation.carLength
                ? { color: "green" }
                : { color: "red" }
            }
          >
            <p>
              {passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
              <span className="ms-2">
                Password Must Have atlast 8 character.
              </span>
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
              <span className="ms-2">
                Password Must Have a special cracter.
              </span>
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