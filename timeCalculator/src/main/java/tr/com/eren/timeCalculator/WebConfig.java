package tr.com.eren.timeCalculator;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Bütün gelen isteklerin program içine alınması için
    // güvenlik eklemek için burayı düzenlemek gerek
    // örneğin http://localhost:5173 --> bu adresten gelen isteklere izin verir (frontendde buradan geliyor)
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*");
    }
}