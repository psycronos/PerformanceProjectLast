package tr.com.eren.timeCalculator.timeMain;

import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.util.List;

@Getter
@Setter
public class TimeCalculateResult {
    private List<Long> workingHoursList; // Çalışılan saat
    private List<Long> dailyWorkHoursList; // O gün eksik veya fazla mesai
    private Long weeklyWorkingHourValue; // Haftalık hesaplanan mesai

    public TimeCalculateResult(List<Long> workingHoursList, List<Long> dailyWorkHoursList, Long weeklyWorkingHourValue ){
        this.workingHoursList = workingHoursList;
        this.dailyWorkHoursList = dailyWorkHoursList;
        this.weeklyWorkingHourValue = weeklyWorkingHourValue;
    }

    // Getter ve Setter metodları

}
