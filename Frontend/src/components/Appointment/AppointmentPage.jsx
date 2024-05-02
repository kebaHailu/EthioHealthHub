import React, { useState } from "react";
import { Button, Steps, message } from "antd";
import moment from "moment";
import "./AppointmentPage.css";
import SelectApppointment from "./SelectApppointment";

const AppointmentPage = () => {
  const [current, setCurrent] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectTime, setSelectTime] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(moment(date).format("YYYY-MM-DD HH:mm:ss"));
  };

  const handleSubmit = () => {
    // Simulating sending data to the server
    // In a real scenario, this would involve an API call
    // Upon successful response, set isScheduled to true
    setIsScheduled(true);

    // For demonstration purposes, showing a success message
    message.success("You are successfully scheduled!");
  };

  const handleNext = () => {
    setCurrent(current + 1);
  };

  const steps = [
    {
      title: "Select Appointment Date & Time",
      content: (
        <SelectApppointment
          handleDateChange={handleDateChange}
          selectedDate={selectedDate}
          selectTime={selectTime}
          setSelectTime={setSelectTime}
        />
      ),
    },
  ];

  return (
    <div
      className="container"
      style={{ marginTop: "8rem", marginBottom: "12rem" }}
    >
      <Steps current={current} items={steps} />
      <div className="mb-5 mt-3 mx-3">{steps[current].content}</div>
      <div className="text-end mx-3">
        {current < steps.length - 1 && (
          <Button
            type="primary"
            size="large"
            disabled={current === 0 ? (selectTime ? false : true) : false}
            onClick={handleNext}
          >
            Next
          </Button>
        )}

        {current === steps.length - 1 && (
          <>
            <Button type="primary" size="large" onClick={handleSubmit}>
              Send
            </Button>
            {isScheduled && (
              <span style={{ marginLeft: "10px", color: "green" }}>
              
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;
