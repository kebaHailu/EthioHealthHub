import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Testimonial.css";
import kibrom from "../../../assets/kibrom.jpg";
import gebby from "../../../assets/gebby.jpg";
import lidiya from "../../../assets/lidiyas.jpg";
import kira from "../../../assets/kira.jpg";
import eshetu from "../../../assets/eshetu.jpg";
import Profile from "../../../assets/Profile.jpg";

import AOS from "aos";
import "aos/dist/aos.css";

const Testimonial = () => {
  useEffect(() => {
    AOS.init({ duration: 2400 });
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="testimonial-container">
      <h3 className="text-3xl text-teal-600 pb-24 meet">MEET THE TEAM</h3>
      <Carousel responsive={responsive}>
        <div data-aos="zoom-in">
          <div className="testimonial-card">
            <img src={kibrom} alt="kibrom" />
            <h3 className="text-lg pb-6">Kibrom Hailu</h3>
            <p className="text-base text-neutral-950">
              Backend Developer and Machine Learnign
            </p>
          </div>
        </div>

        <div data-aos="zoom-in">
          <div className="testimonial-card">
            <img src={gebby} alt="Gebrehiwot Tesfaye" />
            <h3 className="text-lg pb-6">Gebrehiwot Tesfaye</h3>
            <p className="text-base text-neutral-950">Frontend developer</p>
          </div>
        </div>

        <div data-aos="zoom-in">
          <div className="testimonial-card">
            <img src={lidiya} alt="lidiya" />
            <h3 className="text-lg pb-6">Lidiya Abrham</h3>
            <p className="text-base text-neutral-950">Backend</p>
          </div>
        </div>

        <div data-aos="zoom-in">
          <div className="testimonial-card">
            <img src={kira} alt="Kirubel" />
            <h3 className="text-lg pb-6">Kirubel Tadese</h3>
            <p className="text-base text-neutral-950">Frontend</p>
          </div>
        </div>
        <div data-aos="fade-right">
          <div className="testimonial-card">
            <img src={eshetu} alt="eshetu" />
            <h3 className="text-lg pb-6">Eshetu </h3>
            <p className="text-base text-neutral-950">Backend</p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Testimonial;
