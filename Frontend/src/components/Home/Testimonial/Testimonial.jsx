import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Testimonial.css";
import Abigail from "../../../assets/Abigail.jpg";
import gebby from "../../../assets/gebby.jpg";
import Yohanna from "../../../assets/Yohanna.jpg";
import zahir from "../../../assets/zahir.jpg";
import solomon from "../../../assets/solomon.jpg";
import Profile from "../../../assets/Profile.jpg";
import yeab from "../../../assets/yeab.jpg";

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
        <div data-aos="fade-right">
          <div className="testimonial-card">
            <img src={Profile} alt="Abigail" />
            <h3 className="text-lg pb-6">name</h3>
            <p className="text-base text-neutral-950">Backend</p>
          </div>
        </div>

        <div data-aos="zoom-in">
          <div className="testimonial-card">
            <img src={Profile} alt="Yohanna" />
            <h3 className="text-lg pb-6">Yohanna Betsiha</h3>
            <p className="text-base text-neutral-950">Frontend</p>
          </div>
        </div>

        <div data-aos="zoom-in">
          <div className="testimonial-card">
            <img src={gebby} alt="Gebrehiwot Tesfaye" />
            <h3 className="text-lg pb-6">Gebrehiwot Tesfaye</h3>
            <p className="text-base text-neutral-950">Backend</p>
          </div>
        </div>

        <div data-aos="zoom-in">
          <div className="testimonial-card">
            <img src={Profile} alt="Zahir Ahmed" />
            <h3 className="text-lg pb-6">Zahir Ahmed</h3>
            <p className="text-base text-neutral-950">Backend</p>
          </div>
        </div>

        <div data-aos="zoom-in">
          <div className="testimonial-card">
            <img src={Profile} alt="Solomon Tadesse" />
            <h3 className="text-lg pb-6">Solomon Tadesse</h3>
            <p className="text-base text-neutral-950">Frontend</p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Testimonial;
