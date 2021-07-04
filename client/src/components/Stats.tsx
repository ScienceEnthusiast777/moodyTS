import React, { FC } from "react";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";

const Stats: FC<any> = () => {
  const [dateObject, setDateObject] = useState(moment());
  const [userMoods, setUserMoods] = useState<Moods | []>([]);

  type Moods = Array<Mood>;

  type Mood = {
    time: Date;
    amOrPm: "AM" | "PM";
    mood: "sad" | "half-sad" | "neutral" | "half-happy" | "happy";
  };

  useEffect(() => {
    fetchMoods();
  }, [dateObject]);

  const fetchMoods = () => {
    let returnedMoods: Moods;
    axios
      .get("/api/moody/")
      .then((response) => {
        returnedMoods = response.data.moods;
        console.log(returnedMoods)
        setUserMoods(returnedMoods);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const faceIcons = {
    blank: (
      <>
        <img className="w-10" src="/moody-faces/blank.jpg" alt="blank" />
      </>
    ),
    happy: (
      <>
        <img className="w-10" src="/moody-faces/happy.jpg" alt="happy" />
      </>
    ),
    "half-happy": (
      <>
        <img className="w-10" src="/moody-faces/half-happy.jpg" alt="half-happy" />
      </>
    ),
    neutral: (
      <>
        <img className="w-10" src="/moody-faces/neutral.jpg" alt="neutral" />
      </>
    ),
    "half-sad": (
      <>
        <img className="w-10" src="/moody-faces/half-sad.jpg" alt="half-sad" />
      </>
    ),
    sad: (
      <>
        <img className="w-10" src="/moody-faces/sad.jpg" alt="sad" />
      </>
    ),
  };

  const shortDays = moment.weekdaysShort();

  const shortDaysName = shortDays.map((day, i) => {
    return <th key={day + i}>{day}</th>;
  });

  const getInitialDay = (): number => {
    let firstDay = moment(dateObject).startOf("month").format("d");
    return parseInt(firstDay);
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

    if (userMoods.length > 0) {
      for (let i = 0; i < Object.keys(userMoods).length; i++) {
        if (
          moment(userMoods[i].time).month() === dateObject.month() &&
          moment(userMoods[i].time).date() === d &&
          moment(userMoods[i].time).year() === dateObject.year()
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
  let rows : Array<JSX.Element[]> = [];
  let cells : JSX.Element[] = [];

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
};

export default Stats;
