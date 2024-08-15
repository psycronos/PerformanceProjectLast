//TODO Bu external yöntemi yani index.css içerisinde butonun css'i atanmaktadır ve stili burdaki className = "" ile belirtilmektedir.
import "./TotalSchedule.css";
import dayjs, { Dayjs } from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { workingHours } from "../../Store/timeSlice";

function TotalSchedule() {
  //Dayjs formatında -5:-30 yerine -5:30 yazılmasını sağlıyor
  const dailyNecessaryWorkHours = 32400000; // 9 saat'in miliseconds hali
  const weeklyNecessaryWorkHours = 162000000; // 45 saat haftalık çalışma saatinin miliseconds hali
  const workingHours1 = useSelector(workingHours);

  function stringCalculator(time) {
    var sign = "";
    if (time < 0) {
      sign = "-";
    }

    var positiveTime = dayjs.duration(Math.abs(time));
    var hours = positiveTime.days() * 24 + positiveTime.hours();
    return sign + hours.toString().padStart(2, "0") + ":" + positiveTime.minutes().toString().padStart(2, "0");
  }

  var mondayCalculatedTime = workingHours1.pazartesi - dailyNecessaryWorkHours; //dayjs.duration(workingHours1.pazartesi).subtract(dayjs.duration({ hours: 9 })).asMilliseconds();
  var tuesdayCalculatedTime = workingHours1.sali - dailyNecessaryWorkHours;
  var wednesdayCalculatedTime = workingHours1.carsamba - dailyNecessaryWorkHours;
  var thursdayCalculatedTime = workingHours1.persembe - dailyNecessaryWorkHours;
  var fridayCalculatedTime = workingHours1.cuma - dailyNecessaryWorkHours;
  var saturdayCalculatedTime = workingHours1.cumartesi - dailyNecessaryWorkHours;
  var sundayCalculatedTime = workingHours1.pazar - dailyNecessaryWorkHours;

  //var totalAddedTime = mondayTime.add(tuesdayTime.add(wednesdayTime.add(thursdayTime.add(fridayTime.add(saturdayTime.add(sundayTime))))));
  var totalAddedTime = workingHours1.pazartesi + workingHours1.sali + workingHours1.carsamba + workingHours1.persembe + workingHours1.cuma + workingHours1.cumartesi + workingHours1.pazar;

  var totalCalculatedTime = dayjs.duration(totalAddedTime - weeklyNecessaryWorkHours);

  const daysOfWeek = [
    { name: "Pazartesi", workingHours: workingHours1.pazartesi, calculatedTime: mondayCalculatedTime },
    { name: "Salı", workingHours: workingHours1.sali, calculatedTime: tuesdayCalculatedTime },
    { name: "Çarşamba", workingHours: workingHours1.carsamba, calculatedTime: wednesdayCalculatedTime },
    { name: "Perşembe", workingHours: workingHours1.persembe, calculatedTime: thursdayCalculatedTime },
    { name: "Cuma", workingHours: workingHours1.cuma, calculatedTime: fridayCalculatedTime },
    { name: "Cumartesi", workingHours: workingHours1.cumartesi, calculatedTime: saturdayCalculatedTime },
    { name: "Pazar", workingHours: workingHours1.pazar, calculatedTime: sundayCalculatedTime },
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
