import React from "react";
import axios from "axios";
import { useState } from "react";

export default function MoodSubmit() {
  const [submitted, setSubmitted] = useState(<></>);

  function SubmissionFeedback() {
    const timer = setTimeout(() => {
      setSubmitted(<></>);
    }, 2000);
    return () => clearTimeout(timer);
  }
  function submitMood(mood){
    setSubmitted(<>MOOD SUBMITTED</>);
    const timeStamp = new Date();
    const amPm = timeStamp.getHours() >= 12 ? "PM" : "AM";
    axios
      .put("/api/moody/", { mood: mood, amOrPm: amPm })
      .then((response) => {
        console.log(response);
        SubmissionFeedback();
      })
      .catch((err)=>{console.log(err)});
  };

  return (
    <div>
      <h3>What is your current mood </h3>
      <button onClick={() => submitMood("happy")}>
        <img src="/moody-faces/happy.jpg" alt="happy" />
      </button>
      <button onClick={() => submitMood("half-happy")}>
        <img src="/moody-faces/half-happy.jpg" alt="half-happy" />
      </button>
      <button onClick={() => submitMood("neutral")}>
        <img src="/moody-faces/neutral.jpg" alt="neutral" />
      </button>
      <button onClick={() => submitMood("half-sad")}>
        <img src="/moody-faces/half-sad.jpg" alt="half-sad" />
      </button>
      <button onClick={() => submitMood("sad")}>
        <img src="/moody-faces/sad.jpg" alt="sad" />
      </button>
      {submitted}
    </div>
  );
}
