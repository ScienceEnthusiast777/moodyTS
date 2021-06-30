import React from "react";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Stats() {
  const [dateObject, setDateObject] = useState(moment());
  const [userMoods, setUserMoods] = useState({});

  useEffect(() => {
    fetchMoods();
  }, [dateObject]);

  const fetchMoods = () => {
    axios
      .get("/api/moody/")
      .then((response) => {
        setUserMoods(response.data.moods);
        console.log(userMoods);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const faceIcons = {
    blank: (
      <>
        <img className="w-10" src="/moody-faces/blank.jpg" alt="none" />
      </>
    ),
    happy: (
      <>
        <img className="w-10" src="/moody-faces/happy.jpg" alt="none" />
      </>
    ),
    "half-happy": (
      <>
        <img className="w-10" src="/moody-faces/half-happy.jpg" alt="none" />
      </>
    ),
    neutral: (
      <>
        <img className="w-10" src="/moody-faces/neutral.jpg" alt="none" />
      </>
    ),
    "half-sad": (
      <>
        <img className="w-10" src="/moody-faces/half-sad.jpg" alt="none" />
      </>
    ),
    sad: (
      <>
        <img className="w-10" src="/moody-faces/sad.jpg" alt="none" />
      </>
    ),
  };

  const shortDays = moment.weekdaysShort();

  const shortDaysName = shortDays.map((day, i) => {
    return <th key={day + i}>{day}</th>;
  });

  const getInitialDay = () => {
    let firstDay = moment(dateObject).startOf("month").format("d");
    return firstDay;
  };

  let initialDay = getInitialDay();

  let blankDays = [];

  for (let i = 0; i < initialDay; i++) {
    blankDays.push(
      <td>
        {""}
        {faceIcons.blank}
        {faceIcons.blank}
      </td>
    );
  }

  let monthDay = [];

  for (let d = 1; d <= dateObject.daysInMonth(); d++) {
    let am = faceIcons.blank;
    let pm = faceIcons.blank;

    if (Object.keys(userMoods).length > 0) {
      for (let i = 0; i < userMoods.length; i++) {
        if (
          moment(userMoods[i].time).month() === dateObject.month() &&
          moment(userMoods[i].time).date() === d
        ) {
          if (userMoods[i].amOrPm === "AM") {
            am = faceIcons[userMoods[i].mood];
          }
          if (userMoods[i].amOrPm === "PM") {
            pm = faceIcons[userMoods[i].mood];
          }
        }
      }
    }
    monthDay.push(
      <td className="border border-black">
        {d}
        {am}
        {pm}
      </td>
    );
  }

  let allCalendarSlots = [...blankDays, ...monthDay];
  let rows = [];
  let cells = [];

  allCalendarSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === allCalendarSlots.length - 1) {
      rows.push(cells);
    }
  });

  let wrappedDays = rows.map((d, i) => {
    return (
      <tr className="border border-black" key={i}>
        {d}
      </tr>
    );
  });

  const month = () => {
    return dateObject.format("MMMM");
  };

  return (
    <div className="flex flex-col place-items-center font-bold">
      <div>
        <button
          className="cursor-pointer border border-4 hover:border-black m-2 p-2"
          onClick={() => {
            setDateObject(
              moment(dateObject).set("month", dateObject.month() - 1)
            );
          }}
        >
          previous
        </button>
        <button
          className="cursor-pointer border hover:border-black m-2 p-2"
          onClick={() => {
            setDateObject(
              moment(dateObject).set("month", dateObject.month() + 1)
            );
          }}
        >
          next
        </button>
      </div>
      <div>
        {month()} {dateObject.year()}
      </div>
      <table className="table-auto border-collapse border border-black mb-20">
        <thead>
          <tr>{shortDaysName}</tr>
        </thead>
        <tbody>{wrappedDays}</tbody>
      </table>
    </div>
  );
}
