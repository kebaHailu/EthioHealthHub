// StationModal.js
import React from "react";
import { Modal } from "antd";

const StationModal = ({ visible, station, onClose }) => {
  return (
    <Modal
      title={station ? station.name : ""}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      {station && (
        <div>
          <p>Location: {station.location}</p>
        
          <p>Description: {station.description}</p>
          <p>longitude: {station.longtiude}</p>
          <p>latitude: {station.latitude}</p>

          <div className="container">
            {/* // style={{ border: 0, width: "100%", height: "350px" }} */}

            <iframe
              style={{ border: 0, width: "100%", height: "400px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24377.94271582813!2d38.811451987380906!3d8.881589596248707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b83d70148b673%3A0xc893a9d96adeabe1!2sAASTU%20door%201!5e0!3m2!1sam!2set!4v1713859623954!5m2!1sam!2set"
            ></iframe>
          </div>
          {/* Add more details as needed */}
          <div id="map" style={{ width: "100%", height: "400px" }}></div>
        </div>
      )}
    </Modal>
  );
};

export default StationModal;
