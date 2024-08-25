package tr.com.eren.timeCalculator;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import tr.com.eren.timeCalculator.timeMain.TimeCalculateResult;

@Getter
@Setter
public class BaseApiResponse<T> {
    private T data;
    private String message;
    private HttpStatus success;

    public BaseApiResponse(T data, String message, HttpStatus success){
        this.data = data;
        this.message = message;
        this.success = success;
    }


}