import { useState } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import DailySchedule from "./Components/DailySchedule/DailySchedule";
import TotalSchedule from "./Components/TotalSchedule/TotalSchedule";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import axios from "axios";
import { days, totalTimes, resetState } from "./Store/timeSlice";

function App() {
  const dispatch = useDispatch();

  const daysObject = useSelector(days);
  const totalTimesObject = useSelector(totalTimes);
  const [resultDailyWorkingHours, setResultDailyWorkingHours] = useState(null);
  const [resultDailyOverUnderTimes, setResultDailyOverUnderTimes] = useState(null);
  const [resultWeeklyOverUnderTime, setResultWeeklyOverUnderTime] = useState(null);

  return (
    <>
      <div className="row1">
        <DailySchedule day="Pazar" dayInt={0}></DailySchedule>
        <DailySchedule day="Pazartesi" dayInt={1}></DailySchedule>
        <DailySchedule day="Salı" dayInt={2}></DailySchedule>
        <DailySchedule day="Çarşamba" dayInt={3}></DailySchedule>
        <DailySchedule day="Perşembe" dayInt={4}></DailySchedule>
        <DailySchedule day="Cuma" dayInt={5}></DailySchedule>
        <DailySchedule day="Cumartesi" dayInt={6}></DailySchedule>
      </div>
      <div className="row1">
        <TotalSchedule resultDailyWorkingHours={resultDailyWorkingHours} resultDailyOverUnderTimes={resultDailyOverUnderTimes} resultWeeklyOverUnderTime={resultWeeklyOverUnderTime}></TotalSchedule>
      </div>
      <button
        onClick={() => {
          dispatch(resetState());
          setResultDailyWorkingHours(null);
          setResultDailyOverUnderTimes(null);
          setResultWeeklyOverUnderTime(null);
          //TODO weekly de eklenecek
        }}
      >
        Saatleri Temizle
      </button>

      <button
        onClick={() => {
          console.log(daysObject);
          console.log(totalTimesObject);
          axios.post("http://localhost:8083/api/time/echo", { totalTimesObject, daysObject }).then((res) => {
            console.log(res);
            console.log(res.data);
            setResultDailyWorkingHours(res.data.data.workingHoursList);
            setResultDailyOverUnderTimes(res.data.data.dailyOverUnderTimeList);
            setResultWeeklyOverUnderTime(res.data.data.weeklyOverUnderTimeValue);
            //TODO weekly de eklenecek
          });
        }}
      >
        Calculate Time
      </button>
    </>
  );
}

export default App;
