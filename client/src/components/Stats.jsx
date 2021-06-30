import React from "react";
import moment from "moment";
import { useState } from "react";

export default function Stats() {
  const [dateObject, setDateObject] = useState(moment());

  const blank = (
    <>
      <img src="/moody-faces/blank.jpg" alt="none" />
    </>
  );
  const happy = (
    <>
      <img src="/moody-faces/happy.jpg" alt="none" />
    </>
  );const halfHappy = (
    <>
      <img src="/moody-faces/half-happy.jpg" alt="none" />
    </>
  );const neutral = (
    <>
      <img src="/moody-faces/neutral.jpg" alt="none" />
    </>
  );const halfSad = (
    <>
      <img src="/moody-faces/half-sad.jpg" alt="none" />
    </>
  );const sad = (
    <>
      <img src="/moody-faces/sad.jpg" alt="none" />
    </>
  );

  const shortDays = moment.weekdaysShort();

  const shortDaysName = shortDays.map((day) => {
    return <th key={day}>{day}</th>;
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
        {blank}
      </td>
    );
  }

  let monthDay = [];

  console.log("days in month", dateObject.daysInMonth());

  for (let d = 1; d <= dateObject.daysInMonth(); d++) {
    monthDay.push(
      <td>
        {d}
        {blank}
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
    console.log(i)
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
