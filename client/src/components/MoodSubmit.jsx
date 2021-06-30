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
  function submitMood(mood) {
    const timeStamp = new Date();
    const amPm = timeStamp.getHours() >= 12 ? "PM" : "AM";
    axios
      .put("/api/moody/", { mood: mood, amOrPm: amPm })
      .then((response) => {
        console.log(response.data.message);
        setSubmitted(<div className="fixed">{response.data.message}</div>);
        SubmissionFeedback();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex flex-col place-items-center font-bold">
        <h3 className="pt-10 pb-10">What is your current mood ?</h3>
      <div className="flex flex-row justify-center pb-10">
        <button
          className="cursor-pointer border border-4 hover:border-black m-2"
          onClick={() => submitMood("happy")}
        >
          <img className="w-14" src="/moody-faces/happy.jpg" alt="happy" />
        </button>
        <button
          className="cursor-pointer border border-4 hover:border-black m-2"
          onClick={() => submitMood("half-happy")}
        >
          <img
            className="w-14"
            src="/moody-faces/half-happy.jpg"
            alt="half-happy"
          />
        </button>
        <button
          className="cursor-pointer border border-4 hover:border-black m-2"
          onClick={() => submitMood("neutral")}
        >
          <img className="w-14" src="/moody-faces/neutral.jpg" alt="neutral" />
        </button>
        <button
          className="cursor-pointer border border-4 hover:border-black m-2"
          onClick={() => submitMood("half-sad")}
        >
          <img
            className="w-14"
            src="/moody-faces/half-sad.jpg"
            alt="half-sad"
          />
        </button>
        <button
          className="cursor-pointer border border-4 hover:border-black m-2"
          onClick={() => submitMood("sad")}
        >
          <img className="w-14" src="/moody-faces/sad.jpg" alt="sad" />
        </button>
      </div>
      {submitted}
    </div>
  );
}
