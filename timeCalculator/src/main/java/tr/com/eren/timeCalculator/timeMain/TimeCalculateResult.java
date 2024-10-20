package tr.com.eren.timeCalculator.timeMain;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TimeCalculateResult {
    private List<Long> workingHoursList; // Çalışılan saat
    private List<Long> dailyOverUnderTimeList; // O gün eksik veya fazla mesai
    private Long weeklyOverUnderTimeValue; // Haftalık hesaplanan mesai

    public TimeCalculateResult(List<Long> workingHoursList, List<Long> dailyOverUnderTimeList, Long weeklyOverUnderTimeValue){

        this.workingHoursList = workingHoursList;
        this.dailyOverUnderTimeList = dailyOverUnderTimeList;
        this.weeklyOverUnderTimeValue = weeklyOverUnderTimeValue;


    }

    // Getter ve Setter metodları

}
