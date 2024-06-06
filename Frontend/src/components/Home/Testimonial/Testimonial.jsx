import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Testimonial.css";
import kibrom from "../../../assets/kibrom.jpg";
import gebby from "../../../assets/gebby.jpg";
import lidiya from "../../../assets/lidiyas.jpg";
import kira from "../../../assets/kira.jpg";
import eshetu from "../../../assets/eshetu.jpg";

import AOS from "aos";
import "aos/dist/aos.css";

const Testimonial = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
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

  const teamMembers = [
    {
      img: kibrom,
      name: "Kibrom Hailu",
      role: "Backend Developer and Machine Learning",
    },
    {
      img: gebby,
      name: "Gebrehiwot Tesfaye",
      role: "Frontend Developer",
    },
    {
      img: lidiya,
      name: "Lidiya Abrham",
      role: "Backend",
    },
    {
      img: kira,
      name: "Kirubel Tadese",
      role: "Frontend",
    },
    {
      img: eshetu,
      name: "Eshetu",
      role: "Backend",
    },
  ];

  return (
    <div className="testimonial-container">
      <h3 className="text-3xl text-teal-600 pb-24 meet">MEET THE TEAM</h3>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={2000}
        infinite={true}
      >
        {teamMembers.map((member, index) => (
          <div key={index} data-aos="fade-up" data-aos-delay={`${index * 300}`}>
            <div className="testimonial-card">
              <img src={member.img} alt={member.name} />
              <h3 className="text-lg pb-6">{member.name}</h3>
              <p className="text-base text-neutral-950">{member.role}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonial;
