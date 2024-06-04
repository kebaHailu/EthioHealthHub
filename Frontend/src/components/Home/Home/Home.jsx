import React from "react";

import Footer from "../../Shared/Footer/Footer";
import Testimonial from "../Testimonial/Testimonial";
// import ClinicAndSpecialities from "../ClinicAndSpecialities/ClinicAndSpecialities";
// import BookDoctor from "../BookOurDoctor/BookDoctor";
import Availabe from "../AvailableFeatures/Available";
import HeroSection from "../HeroSection/HeroSection";
import InfoPage from "../InfoPage/InfoPage";
import Header from '../../Shared/Header/Header';
import Service from "../Services/Service";
import Gallery from "../Gallery/Gallery";
// import OurDoctors from "../OurDoctor/OurDoctors";
// import Stations from "../../Stations/Stations";

const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <InfoPage />
      <Service />

      {/* <BookDoctor /> */}
     
      <Availabe />
      {/* <OurDoctors /> */}
      <Testimonial />
      <Gallery />
      <Footer />
    </>
  );
};

export default Home;
