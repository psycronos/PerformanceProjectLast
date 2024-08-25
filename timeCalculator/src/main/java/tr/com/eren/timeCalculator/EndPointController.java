package tr.com.eren.timeCalculator;

import tr.com.eren.timeCalculator.models.Times;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tr.com.eren.timeCalculator.timeMain.TimeCalculateDispatcher;
import tr.com.eren.timeCalculator.timeMain.TimeCalculateResult;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/time")
//@CrossOrigin(origins = "http://localhost:5173")
public class EndPointController {

    @Autowired
    private TimeCalculateDispatcher dispatcher;

    @PostMapping("/echo")
    public BaseApiResponse<TimeCalculateResult> echoTimeRequest(@RequestBody Times requestBody) {
        TimeCalculateResult result = dispatcher.dispatch(requestBody);

        return new BaseApiResponse<TimeCalculateResult>(result,"Deneme", HttpStatus.OK);
    }
}