package tr.com.eren.timeCalculator.models;

import java.util.List;
import java.util.Map;

public class Times {

    private Map<String, Integer> workingHours1;
    private Map<String, List<List<String>>> daysObject;

    public Times(Map<String, Integer> workingHours1, Map<String, List<List<String>>> daysObject) {
        this.workingHours1 = workingHours1;
        this.daysObject = daysObject;
    }

    // Getters and Setters
    public Map<String, Integer> getWorkingHours1() {
        return workingHours1;
    }

    public void setWorkingHours1(Map<String, Integer> workingHours1) {
        this.workingHours1 = workingHours1;
    }

    public Map<String, List<List<String>>> getDaysObject() {
        return daysObject;
    }

    public void setDaysObject(Map<String, List<List<String>>> daysObject) {
        this.daysObject = daysObject;
    }

    @Override
    public String toString() {
        return "WorkSchedule{" +
                "workingHours1=" + workingHours1 +
                ", daysObject=" + daysObject +
                '}';
    }

}
