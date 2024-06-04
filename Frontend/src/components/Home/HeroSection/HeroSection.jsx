import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div>
            <small>TOTAL HEALTH CARE SOLUTION</small>
            <h1>
              Your Most Trusted <br />
              Health Partner
            </h1>
            <small>
              Experience seamless appointments with leading specialists in skin
              and eye care, providing exceptional treatment and support for your
              health needs
            </small>
          </div>
          <div className="d-flex justify-content-start gap-2">
            <Link to={"/login"} className="btn-get-started scrollto">
              Get Started
            </Link>
            <Link
              to={"/appointment"}
              className="btn-get-started scrollto"
            >
              Track Appointment
            </Link>
          </div>
        </div>
      </section>
    );
}
export default HeroSection;