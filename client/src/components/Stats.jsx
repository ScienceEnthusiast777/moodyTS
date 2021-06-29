import React from "react";
import moment from "moment";
import { useState } from "react";

export default function Stats() {
  const shortDays = moment.weekdaysShort();
  const shortDaysName = shortDays.map((day)=>{
    return (
      <th key={day}>{day}</th>
    )
  })
  const getInitialDay = () =>{
    
  }
  return <div>

  </div>;
}
