import React from 'react';
import './InfoPage.css';
import { FaClock, FaHeadset,FaHouseUser  } from "react-icons/fa";
import { Link } from 'react-router-dom';

const InfoPage = () => {
    return (
      <section className="why-us mt-5 mt-md-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 d-flex align-items-stretch">
              <div className="content">
                <h3>Why Choose Us?</h3>
                <p>
                  Our platform connects you with top specialists in skin and eye
                  diseases, ensuring expert care. Enjoy a seamless booking
                  experience and personalized support. Trust us for reliable,
                  professional, and compassionate healthcare services. Your
                  health is our priority, making your journey to wellness smooth
                  and stress-free.
                </p>
                <div className="text-center">
                  <Link href="/" className="more-btn">
                    Learn More <i className="bx bx-chevron-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-8 d-flex align-items-stretch">
              <div className="icon-boxes d-flex flex-column justify-content-center">
                <div className="row">
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                      <FaHouseUser className="icon" />
                      <h4>Appointment</h4>
                      <small className="text-secondary">18 Hours Service</small>
                      <p>
                        18 Hours of Service We provide 18 hours of
                        service, linking you with specialists in skin and eye
                        diseases. Enjoy easy booking and personalized support.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                      <FaHeadset className="icon" />
                      <h4>Emegency Cases</h4>
                      <h6 className="text-secondary">+251 953 467 793</h6>
                      <p>
                        In case of an emergency, please visit the
                        nearest hospital immediately. Our platform is designed
                        for non-emergency consultations and specialist
                        appointments.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                      <FaClock className="icon" />
                      <h4>Working Hours</h4>
                      <small className="text-secondary">Timing schedule</small>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between text-nowrap">
                          <p>Sun - Wed : </p> <p>8:00 - 17: 00</p>
                        </li>
                        <li className="list-group-item d-flex justify-content-between text-nowrap">
                          <p>Thus - Fri : </p> <p>9:00 - 17: 00</p>
                        </li>
                        <li className="list-group-item d-flex justify-content-between text-nowrap">
                          <p>Sat - Sun : </p> <p>10:00 - 17: 00</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default InfoPage