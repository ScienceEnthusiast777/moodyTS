import React from "react";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { Mongoose } from "mongoose";

export default function Stats() {
  const [dateObject, setDateObject] = useState(moment());
  const [userMoods, setUserMoods] = useState({});

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = () => {
    axios
      .get("/api/moody/")
      .then((response) => {
        setUserMoods(response.data.moods);
        console.log(userMoods)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const faceIcons = {
    blank : (
      <>
        <img src="/moody-faces/blank.jpg" alt="none" />
      </>
    ),
    happy : (
      <>
        <img src="/moody-faces/happy.jpg" alt="none" />
      </>
    ),
    "half-happy" : (
      <>
        <img src="/moody-faces/half-happy.jpg" alt="none" />
      </>
    ),
    neutral : (
      <>
        <img src="/moody-faces/neutral.jpg" alt="none" />
      </>
    ),
    "half-sad" : (
      <>
        <img src="/moody-faces/half-sad.jpg" alt="none" />
      </>
    ),
    sad : (
      <>
        <img src="/moody-faces/sad.jpg" alt="none" />
      </>
    )
  }

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
      for(let i = 0 ; i < userMoods.length; i++){
        if(moment(userMoods[i].time).month() === dateObject.month() && moment(userMoods[i].time).date() === d){
          if(userMoods[i].amOrPm === "AM"){
            am = faceIcons[userMoods[i].mood]
          }
          if(userMoods[i].amOrPm === "PM"){
            pm = faceIcons[userMoods[i].mood]
          }
        }
      }
    }
    monthDay.push(
      <td>
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
    return <tr key={i}>{d}</tr>;
  });

  const month = () => {
    return dateObject.format("MMMM");
  };

  return (
    <div>
      <div>
        {month()} {dateObject.year()}
      </div>
      <table>
        <thead>
          <tr>{shortDaysName}</tr>
        </thead>
        <tbody>{wrappedDays}</tbody>
      </table>
      <button
        onClick={() => {
          setDateObject(
            moment(dateObject).set("month", dateObject.month() - 1)
          );
        }}
      >
        previous month
      </button>
      <button
        onClick={() => {
          setDateObject(
            moment(dateObject).set("month", dateObject.month() + 1)
          );
        }}
      >
        next month
      </button>
    </div>
  );
}
