import { useState } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import DailySchedule from "./Components/DailySchedule/DailySchedule";
import TotalSchedule from "./Components/TotalSchedule/TotalSchedule";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "./Store/timeSlice";
import React from "react";
import axios from "axios";

import { days, workingHours } from "./Store/timeSlice";

function App() {
  const dispatch = useDispatch();
  const workingHours1 = useSelector(workingHours);
  const daysObject = useSelector(days);

  return (
    <>
      <div className="row1">
        <DailySchedule day="Pazartesi" dayInt={0}></DailySchedule>
        <DailySchedule day="Salı" dayInt={1}></DailySchedule>
        <DailySchedule day="Çarşamba" dayInt={2}></DailySchedule>
        <DailySchedule day="Perşembe" dayInt={3}></DailySchedule>
        <DailySchedule day="Cuma" dayInt={4}></DailySchedule>
        <DailySchedule day="Cumartesi" dayInt={5}></DailySchedule>
        <DailySchedule day="Pazar" dayInt={6}></DailySchedule>
      </div>
      <div className="row1">
        <TotalSchedule></TotalSchedule>
      </div>
      <button
        onClick={() => {
          dispatch(resetState());
        }}
      >
        Saatleri Temizle
      </button>

      <button
        onClick={() => {
          axios.post("http://localhost:8083/api/time/echo", { workingHours1, daysObject }).then((res) => {
            console.log(res);
            console.log(res.data);
          });
        }}
      >
        Calculate Time
      </button>
    </>
  );
}

export default App;
