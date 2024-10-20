package tr.com.eren.timeCalculator.models;

import java.time.Duration;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.*;

public class Times {


    /** days[pazar[saat1[in,out],saat2[in,out],...],pazartesi[saat1[in,out],saat2[in,out],...],...] */
    private List<List<List<OffsetDateTime>>> daysObject;
    private List<OffsetDateTime> totalTimes;

    public Times(Map<String, Long> totalTimesObject, Map<String, List<List<Long>>> daysObject) {
        /*

        */
        this.daysObject = new ArrayList<List<List<OffsetDateTime>>>();
        for (List<List<Long>> days : daysObject.values()) { //gün
            ArrayList<List<OffsetDateTime>> newDayList = new ArrayList<List<OffsetDateTime>>();
            for (List<Long> longList : days) {  // İkililer
                ArrayList<OffsetDateTime> newDualTimes = new ArrayList<OffsetDateTime>();
                for (Long longValue : longList) { // ikili  saat
                    if (longValue == null) {
                        newDualTimes.add(null);
                    }
                    else{
                        OffsetDateTime offsetDateTime = OffsetDateTime.ofInstant(Instant.ofEpochMilli(longValue),
                                ZoneOffset.UTC);
                        newDualTimes.add(offsetDateTime);
                    }

                }
                newDayList.add(newDualTimes);
            }
            this.daysObject.add(newDayList);
        }
        this.totalTimes = new ArrayList<OffsetDateTime>();

        for(Long longValue: totalTimesObject.values()){
            if (longValue == null) {
                this.totalTimes.add(null);
            }
            else {
                OffsetDateTime offsetDateTime = OffsetDateTime.ofInstant(Instant.ofEpochMilli(longValue),
                        ZoneOffset.UTC);
                this.totalTimes.add(offsetDateTime);
            }
        }

    }

        public static String formatDuration(Duration duration) {
            long totalTime = duration.toSeconds();
            int hours = (int) (totalTime / (60*60));
            long totalMinutes = totalTime % (60*60);
            int minutes = (int) (totalMinutes / 60);
            long totalSeconds = totalMinutes % 60;

            return String.format("%02d.%02d.%02d", hours, minutes, totalSeconds);
        }


    public List<List<List<OffsetDateTime>>> getDaysObject() {
        return this.daysObject;
    }

    public List<OffsetDateTime> getTotalTimes(){
        return this.totalTimes;
    }


    @Override
    public String toString() {

        return "WorkSchedule{" +
                ", daysObject=" + daysObject +
                '}';
    }


}
