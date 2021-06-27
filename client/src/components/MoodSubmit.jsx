import React from "react";
import axios from "axios";

export default function MoodSubmit() {
  const submitMood = (mood) => {
    axios
      .post("/api/moody/", { mood: mood })
      .then((response) => console.log(response));
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
    </div>
  );
}
