import React from "react";
import { InlineWidget } from "react-calendly";

const calendly = () => {
  return (
    <div className="App">
      <InlineWidget url="https://calendly.com/tesfayegebrehiwot123" />
    </div>
  );
};

export default calendly;
