package tr.com.eren.timeCalculator.timeMain;

import tr.com.eren.timeCalculator.models.Times;
import org.springframework.stereotype.Service;

@Service
public class TimeCalculateDispatcher {

    public TimeCalculateResult dispatch(Times data) {
        // Gelen veriyle ilgili işlemleri burada yapın
        System.out.println("Dispatcher çalıştırıldı: " + data);
        //System.out.println("To String: " + data.toString()); //Override yapıldığı olduğu için böyle oluyor üstte

        // İlgili fonksiyonu burada çağırabilirsiniz
        return processData(data);
    }

    private TimeCalculateResult processData(Times data) {
        // Veriyi işleme kodları burada olacak
        return null; //TODO döndürülecek işlemler burada yapılacak
        //TODO tüm saat hesaplamaları burda yapılacak burdan frontende dönecek
    }
}