import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Row, Col, Input, Button, message } from "antd";
import axios from "axios";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";
import "./Stations.css";
import StationModal from "../StationModal/StationModal"; // Import the modal component

const Stations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stations, setStations] = useState([]);
  const [displayedStations, setDisplayedStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null); // Track the selected station
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch stations data from API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/station/")
      .then((response) => {
        setStations(response.data);
        setDisplayedStations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the stations!", error);
        message.error("Failed to load stations");
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const results = stations.filter(
      (station) =>
        station.name.toLowerCase().includes(value.toLowerCase()) ||
        station.location.toLowerCase().includes(value.toLowerCase())
    );
    setDisplayedStations(results);
  };

  const handleViewDetails = (station) => {
    setSelectedStation(station);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedStation(null);
    setModalVisible(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="section-title">
          <h2>Health Stations</h2>
          <h3>Find the best health stations near you</h3>
        </div>
        <div className="search-bar">
          <Input
            placeholder="Search Stations"
            prefix={<FaSearch />}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="stations-list">
          <Row gutter={[20, 20]}>
            {displayedStations.map((station) => (
              <Col key={station.id} >
                <div className="station-card">
                  <img src={station.cover_image} alt={station.name} />
                  <div className="station-info">
                    <h3>{station?.name}</h3>
                    <p>{station?.location}</p>
                   
                    <p>{station?.description}</p>
                  </div>
                  <div className="station-buttons">
                    <Button
                      className="view-details-button"
                      onClick={() => handleViewDetails(station)}
                    >
                      View Details
                    </Button>
                    <Button className="view-details-button">
                      Make Appointment
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Modal to display station details */}
        <StationModal
          visible={modalVisible}
          station={selectedStation}
          onClose={handleCloseModal}
        />
      </div>
      <Footer />
    </>
  );
};

export default Stations;
