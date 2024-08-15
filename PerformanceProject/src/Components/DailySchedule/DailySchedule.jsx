import React, { useState } from "react";
import InputTime from "../InputTime/InputTime";
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "./DailySchedule.css";

import { useSelector, useDispatch } from "react-redux";
import { setTotalTime, totalTimes } from "../../Store/timeSlice";

function DailySchedule({ day, dayInt }) {
  const dispatch = useDispatch();
  const totalTimesObject = useSelector(totalTimes);

  const handleTotalChange = (newTime) => {
    if (newTime == null || !newTime?.isValid()) {
      dispatch(setTotalTime({ day: dayInt, time: null }));
    } else {
      dispatch(setTotalTime({ day: dayInt, time: newTime.valueOf() }));
    }
  };

  return (
    <>
      <div className="column1">
        <p>{day}</p>
        <div className="row1">
          <p>Toplam Saat: </p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker sx={{ width: "130px" }} ampm={false} value={dayjs(totalTimesObject[Object.keys(totalTimesObject)[dayInt]])} onChange={handleTotalChange} />
          </LocalizationProvider>
        </div>
        <br />

        <InputTime
          day={dayInt}
          n={0}
          isDisabled={!(totalTimesObject[Object.keys(totalTimesObject)[dayInt]] === null)} // ! --> not direkt. ? ise --> sol taraf(totalValue) null ise sağ taraf işlenmeden value direkt Null olur
        ></InputTime>
      </div>
    </>
  );
}

export default DailySchedule;
