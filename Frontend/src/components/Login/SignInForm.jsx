import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import log from '../../images/doc/info.svg';
import register from '../../images/doc/register.svg';
import SignIn from './SignIn';
import './SignInForm.css';
import SignUp from './SignUp';

const SignInForm = () => {
    const [isSignUp, setSignUp] = useState(false);
    return (
      <div
        className={`${
          isSignUp
            ? "signin-signup-container sign-up-mode"
            : "signin-signup-container"
        }`}
      >
        <Link to="/">
          <span className="pageCloseBtn">
            <FaTimes />
          </span>
        </Link>
        <div className="forms-container">
          <div className="signIn-singUp">
            <SignIn />
            <SignUp setSignUp={setSignUp} />
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3 className="text-white">New here ?</h3>
              <p>
                Welcome to EthioHealth Hub, your gateway to comprehensive health
                resources! If you're new to our platform, please sign up to
                access all our services and features.
              </p>
              <button
                className="iBtn transparent"
                onClick={() => setSignUp(true)}
              >
                Sign Up
              </button>
            </div>
            <img src={`${log}`} alt="" className="pImg" />
          </div>

          <div className="panel right-panel">
            <div className="content">
              <h3 className="text-white">One of us ?</h3>
              <p>
                Fantastic, you're now one of us at EthioHealth Hub! Welcome to a
                community dedicated to enhancing health and wellness. Together,
                we strive for excellence and innovation in healthcare.
              </p>
              <button
                className="iBtn transparent"
                onClick={() => setSignUp(false)}
              >
                Sign In
              </button>
            </div>
            <img src={`${register}`} alt="" className="pImg" />
          </div>
        </div>
      </div>
    );
};

export default SignInForm;