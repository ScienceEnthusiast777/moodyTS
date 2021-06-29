import React from "react";
import moment from "moment";
import { useState } from "react";

export default function Stats() {
  const [dateObject, setDateObject] = useState(moment());

  const shortDays = moment.weekdaysShort();

  const shortDaysName = shortDays.map((day) => {
    return <th key={day}>{day}</th>;
  });

  const getInitialDay = () => {
    let firstDay = moment(dateObject).startOf("month").format("d");
    console.log(firstDay);
    return firstDay;
  };

  let initialDay = getInitialDay();

  let blankDays = [];

  for (let i = 0; i < initialDay; i++) {
    blankDays.push(<td>{""}</td>);
  }

  let monthDay = [];

  for (let d = 1; d <= dateObject.daysInMonth(); d++) {
    monthDay.push(<td>{d}</td>);
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
    return <tr>{d}</tr>;
  });

  return <div>
    <table>
      <thead>
        <tr>{shortDaysName}</tr>
      </thead>
      <tbody>{wrappedDays}</tbody>
    </table>
  </div>;
}
