//TODO Bu external yöntemi yani index.css içerisinde butonun css'i atanmaktadır ve stili burdaki className = "" ile belirtilmektedir.
import "./TotalSchedule.css";
import dayjs, { Dayjs } from "dayjs";

function TotalSchedule({ resultDailyWorkingHours, resultDailyOverUnderTimes, resultWeeklyOverUnderTime }) {
  function stringCalculator(time) {
    var sign = "";
    if (time < 0) {
      sign = "-";
    }

    var positiveTime = dayjs.duration(Math.abs(time));
    var hours = positiveTime.days() * 24 + positiveTime.hours();
    return sign + hours.toString().padStart(2, "0") + ":" + positiveTime.minutes().toString().padStart(2, "0");
  }

  var totalCalculatedTime = dayjs.duration(resultWeeklyOverUnderTime ?? 0);

  const daysOfWeek = [
    { name: "Pazar", workingHours: resultDailyWorkingHours ? resultDailyWorkingHours[0] : 0, calculatedTime: resultDailyOverUnderTimes ? resultDailyOverUnderTimes[0] : 0 },
    { name: "Pazartesi", workingHours: resultDailyWorkingHours ? resultDailyWorkingHours[1] : 0, calculatedTime: resultDailyOverUnderTimes ? resultDailyOverUnderTimes[1] : 0 },
    { name: "Salı", workingHours: resultDailyWorkingHours ? resultDailyWorkingHours[2] : 0, calculatedTime: resultDailyOverUnderTimes ? resultDailyOverUnderTimes[2] : 0 },
    { name: "Çarşamba", workingHours: resultDailyWorkingHours ? resultDailyWorkingHours[3] : 0, calculatedTime: resultDailyOverUnderTimes ? resultDailyOverUnderTimes[3] : 0 },
    { name: "Perşembe", workingHours: resultDailyWorkingHours ? resultDailyWorkingHours[4] : 0, calculatedTime: resultDailyOverUnderTimes ? resultDailyOverUnderTimes[4] : 0 },
    { name: "Cuma", workingHours: resultDailyWorkingHours ? resultDailyWorkingHours[5] : 0, calculatedTime: resultDailyOverUnderTimes ? resultDailyOverUnderTimes[5] : 0 },
    { name: "Cumartesi", workingHours: resultDailyWorkingHours ? resultDailyWorkingHours[6] : 0, calculatedTime: resultDailyOverUnderTimes ? resultDailyOverUnderTimes[6] : 0 },
  ];

  return (
    <div className="column1">
      <table>
        <thead>
          <tr>
            <th>Gün</th>
            <th>Çalışılan Saat</th>
            <th>Günlük eksik/fazla</th>
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day, index) => (
            <tr key={index}>
              <td>{day.name}</td>
              <td>{stringCalculator(day.workingHours)}</td>
              <td className={day.calculatedTime >= 0 ? "p2" : "p1"}>{stringCalculator(day.calculatedTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row1">
        <p>Haftalık eksik/fazla =</p>
        <p className={totalCalculatedTime >= 0 ? "p2" : "p1"}>{stringCalculator(totalCalculatedTime)}</p>
      </div>
    </div>
  );
}
export default TotalSchedule;
