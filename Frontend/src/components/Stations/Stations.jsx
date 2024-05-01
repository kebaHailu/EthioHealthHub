import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Row, Col, Input, Button } from "antd";
import "./Stations.css";
import StationModal from "../StationModal/StationModal"; // Import the modal component

const Stations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedStations, setDisplayedStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null); // Track the selected station
  const [modalVisible, setModalVisible] = useState(false);

  // Mock data for stations
  const stations = [
    {
      id: 1,
      name: "Station 1",
      location: "Location 1",
      contact: "Contact 1",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Station 2",
      location: "Location 2",
      contact: "Contact 2",
      imageUrl: "https://via.placeholder.com/150",
    },
    // Add more stations as needed
    {
      id: 3,
      name: "Station 3",
      location: "Location 3",
      contact: "Contact 3",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Station 4",
      location: "Location 4",
      contact: "Contact 4",
      imageUrl: "https://via.placeholder.com/150",
    },
    // Add more stations as needed
  ];

  // Initialize displayedStations with all stations when component mounts
  useEffect(() => {
    setDisplayedStations(stations);
  }, []); // Empty dependency array ensures this effect runs only once on mount

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

  return (
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
        <Row gutter={[16, 16]}>
          {displayedStations.map((station) => (
            <Col key={station.id} xs={24} sm={12}>
              <div className="station-card">
                <img src={station.imageUrl} alt={station.name} />
                <div className="station-info">
                  <h3>{station?.name}</h3>
                  <p>{station?.location}</p>
                  <p>{station?.contact}</p>
                </div>
                <div className="station-buttons">
                  <Button
                    className="view-details-button"
                    // type="primary"
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
  );
};

export default Stations;
