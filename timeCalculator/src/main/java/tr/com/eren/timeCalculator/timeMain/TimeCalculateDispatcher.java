package tr.com.eren.timeCalculator.timeMain;

import tr.com.eren.timeCalculator.models.Times;
import org.springframework.stereotype.Service;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.time.Duration;

@Service
public class TimeCalculateDispatcher {

    public TimeCalculateResult dispatch(Times data) {
        // Gelen veriyle ilgili işlemleri burada yapın

        System.out.println("Dispatcher çalıştırıldı: " + data);
        // System.out.println("To String: " + data.toString()); //Override yapıldığı
        // olduğu için böyle oluyor üstte

        // İlgili fonksiyonu burada çağırabilirsiniz

        for (List<List<OffsetDateTime>> day : data.getDaysObject()) {
            for (List<OffsetDateTime> times : day) {
                for (OffsetDateTime time : times) {
                    System.out.println("Time: " + time.toEpochSecond() * 1000); // Mili Seconda çevirildi *1000 ile
                    System.out.println(time.getDayOfMonth());
                }
            }

        }
        return processData(data);
    }

    private TimeCalculateResult processData(Times data) {
        // Veriyi işleme kodları burada olacak
        data = entryHourSevenBetweenEight(data);
        // TODO ARTIK BURADAN İTİBAREN DEFTERDE YAZILI KONTROLLER YAPILACAK
        // TODO ARTIK BURADAN İTİBAREN DEFTERDE YAZILI KONTROLLER YAPILACAK
        // TODO ARTIK BURADAN İTİBAREN DEFTERDE YAZILI KONTROLLER YAPILACAK
        // TODO ARTIK BURADAN İTİBAREN DEFTERDE YAZILI KONTROLLER YAPILACAK
        // TODO ARTIK BURADAN İTİBAREN DEFTERDE YAZILI KONTROLLER YAPILACAK
        // TODO ARTIK BURADAN İTİBAREN DEFTERDE YAZILI KONTROLLER YAPILACAK

        List<Long> workingHours = calculateWorkingHours(data);
        List<Long> dailyOverUnderTimes = calculateDailyOverUnderTimeList(workingHours);
        Long weeklyWorkingHour = calculateWeeklyWorkHourList(workingHours);

        TimeCalculateResult timeCalculateResult = new TimeCalculateResult(workingHours, dailyOverUnderTimes,
                weeklyWorkingHour);
        return timeCalculateResult;
    }

    private List<Long> calculateWorkingHours(Times times) {
        List<Long> result = new ArrayList<>();

        // Her günün çalışma süresini hesapla
        for (int i = 0; i < times.getDaysObject().size(); i++) {

            // Eğer totalTime varsa WorkingHours es geçilerek TotalTimes'ın Saat'i ve
            // Dakikası alınarak o eklenmektedir
            if (times.getTotalTimes().get(i) != null) {
                // TODO UTC nedeniyle TotalTimesdan gelen değer'in saatine +3 eklemek durumunda
                // kaldım
                // Ön yüzden gelen değer total time 8.30 ise UTC nedeniyle backende 5.30 olarak
                // geliyor bu nedenle +3 saat üstüne ekledim
                // +3'ü CONSTANT YAP --> Bunları değişkenle atanacak hale getir --> CONSTANT
                // YAPMAYI UNUTMA +3'ü
                OffsetDateTime totalTime = times.getTotalTimes().get(i).plusHours(3);
                result.add(Duration.ofHours(totalTime.getHour()).plusMinutes(totalTime.getMinute()).toMillis());
            }

            else {
                List<List<OffsetDateTime>> day = times.getDaysObject().get(i);
                long totalMiliSecondsPerDay = 0;
                // Gün içindeki çiftler üzerinde dolaş
                for (List<OffsetDateTime> dual : day) {
                    totalMiliSecondsPerDay += Duration.between(dual.get(0), dual.get(1)).toMillis(); // Çiftlerin
                                                                                                     // süresini
                                                                                                     // milisaniye
                                                                                                     // olarak al
                }

                result.add(totalMiliSecondsPerDay); // Toplam süreyi sonuç listesine ekle

            }

        }

        return result;
    }

    /** Günlük Eksik Fazla Mesaiyi hesaplar */
    private List<Long> calculateDailyOverUnderTimeList(List<Long> times) {
        List<Long> result = new ArrayList<>();
        // TODO 9 saat ve haftalık 45 saatide constant yapabilirsin...
        long requiredWorkingHour = 9 * 60 * 60 * 1000; // 9 saat milisaniye cinsinden

        // Her elemandan requiredWorkingHour'u çıkar ve sonucu listeye ekle
        for (Long time : times) {
            result.add(time - requiredWorkingHour);
        }

        return result;
    }

    /** Haftalık toplam Mesaiyi hesaplar */
    // TODO bunu sonradan haftanın sonuna denk geliyorsa bölecek şekilde revize
    // etmeye çalış ....
    private Long calculateWeeklyWorkHourList(List<Long> times) {
        long weeklyWorkingHour = 0;
        // TODO 9 saat ve haftalık 45 saatide constant yapabilirsin...
        long requiredWeeklyWorkingHour = 45 * 60 * 60 * 1000; // 45 saat milisaniye cinsinden

        // Her elemandan requiredWorkingHour'u çıkar ve sonucu listeye ekle
        for (Long time : times) {
            weeklyWorkingHour += time;
        }
        long result = weeklyWorkingHour - requiredWeeklyWorkingHour;

        return result;
    }

    // CONTROLS !!!!
    // TODO ARTIK BURADAN İTİBAREN DEFTERDE YAZILI KONTROLLER YAPILACAK
    // TODO ARTIK BURADAN İTİBAREN DEFTERDE YAZILI KONTROLLER YAPILACAK
    // TODO ARTIK BURADAN İTİBAREN DEFTERDE YAZILI KONTROLLER YAPILACAK
    // TODO ARTIK BURADAN İTİBAREN DEFTERDE YAZILI KONTROLLER YAPILACAK
    // TODO ARTIK BURADAN İTİBAREN DEFTERDE YAZILI KONTROLLER YAPILACAK
    // TODO ARTIK BURADAN İTİBAREN DEFTERDE YAZILI KONTROLLER YAPILACAK
    /** 7.00 ile 8.00 arasında olan saatler 8.00'a set edilir */
    private Times entryHourSevenBetweenEight(Times times) {
        // TODO sabit değerleri bir enuma ata örneğin 7.00 olan saat burda 4.00 oldu ->
        // 4 değerini constant yap
        times.getDaysObject().forEach((days) -> { // days
            days.forEach((dualTimes) -> { // ikili zamanlar
                for (int i = 0; i < dualTimes.size(); i++) { // loop through each time in dualTimes
                    OffsetDateTime time = dualTimes.get(i);

                    // Türkiye saati ile 7, UTC saatine göre 7-3 = 4 olmaktadır 8'de 8-3 = 5
                    // olmaktadır
                    // HESAP HERZAMAN UTC İLE YAPILMALIDIR BU NEDENLE KONTROLLERE -3 EKLENDİ
                    if (time.getHour() == 4 && time.getMinute() > 0) { // TAM 7 ise 7 den itibaren alınacak 7.01 8'e
                                                                       // yuvarlanır
                        OffsetDateTime newTime = time.withHour(5).withMinute(0);
                        dualTimes.set(i, newTime); // replace old time with new time
                    }
                }
            });
        });
        return times;
    }

    // private timeRounding
}