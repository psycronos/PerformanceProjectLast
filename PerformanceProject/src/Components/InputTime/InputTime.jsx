//TODO Bu external yöntemi yani index.css içerisinde butonun css'i atanmaktadır ve stili burdaki className = "" ile belirtilmektedir.
import "./InputTime.css";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel"; //Şuanlık CheckBox ile beraber kullanılıyor Label
import duration from "dayjs/plugin/duration"; // Duration eklentisi

//---------------------------------/
import { useSelector, useDispatch } from "react-redux";
import {
  days,
  addBeginTime,
  addEndTime,
  removeTimeAfterN,
} from "../../Store/timeSlice";

dayjs.extend(duration);

//day int olacak 0 1 2 3 gibi gün tutacak
const InputTime = ({ day, n, isDisabled = false }) => {
  const daysObject = useSelector(days);
  const dispatch = useDispatch();
  //------------------------------------------------------------------
  const [isChecked, setIsChecked] = useState(false);

  const handleInput1Change = (newTime) => {
    if (newTime == null || !newTime?.isValid()) {
      dispatch(addBeginTime({ day: day, n: n, time: null }));
    } else {
      dispatch(addBeginTime({ day: day, n: n, time: newTime.valueOf() }));
    }
  };

  const handleInput2Change = (newTime) => {
    if (newTime == null || !newTime?.isValid()) {
      dispatch(addEndTime({ day: day, n: n, time: null }));
    } else {
      dispatch(addEndTime({ day: day, n: n, time: newTime.valueOf() }));
    }
  };

  const getEndTimeStore = (day) => {
    var endTime = null;
    if (daysObject[Object.keys(daysObject)[day]][n]) {
      const times = daysObject[Object.keys(daysObject)[day]][n];
      endTime = dayjs(times[1]);
    }
    return endTime;
  };

  const getBeginTimeStore = (day) => {
    var beginTime = null;
    if (daysObject[Object.keys(daysObject)[day]][n]) {
      const times = daysObject[Object.keys(daysObject)[day]][n];
      beginTime = dayjs(times[0]);
    }
    return beginTime;
  };

  return (
    <div className="column1">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="row1">
          <p>{n + 1}. giriş saati =</p>

          <TimePicker
            value={getBeginTimeStore(day)}
            onChange={handleInput1Change}
            sx={{ width: "150px" }}
            ampm={false}
            disabled={isDisabled}
            maxTime={getEndTimeStore(day)} //1. time değişkeni maximum 2. nin değeri kadar olabilecek
          />
        </div>

        <div className="row1">
          <p>{n + 1}. çıkış saati =</p>

          <TimePicker
            value={getEndTimeStore(day)}
            onChange={handleInput2Change}
            sx={{ width: "150px" }}
            ampm={false}
            disabled={isDisabled}
            minTime={getBeginTimeStore(day)} //2. time değişkeni minimum 1. nin değeri kadar olabilecek
          />
        </div>
      </LocalizationProvider>
      <FormControlLabel
        value="start"
        control={
          <Checkbox
            value={isChecked}
            onChange={(event) => {
              setIsChecked(event.target.checked);
              if (!event.target.checked) {
                dispatch(removeTimeAfterN({ day: day, n: n }));
              }
            }}
          />
        }
        label={n + 1 + ". Giriş Var mı?"}
        labelPlacement="start"
      />
      {isChecked ? (
        <InputTime n={n + 1} day={day} isDisabled={isDisabled}></InputTime>
      ) : (
        <></>
      )}{" "}
      {/** InputTime içerisinde birtane daha InputTime çağırılıyor bu sayede iç içe birden çok component çağırılıyor */}
    </div>
  );
};

export default InputTime;
