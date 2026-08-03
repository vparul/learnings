package personal.jobPortal.config.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.ApiVersionConfigurer;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configureApiVersioning(ApiVersionConfigurer configurer) {
        configurer.useMediaTypeParameter(MediaType.parseMediaType("application/vnd.eazyapp+json"), "v")
                .addSupportedVersions("1.0", "2.0", "3.0").setDefaultVersion("1.0");
    }

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.addPathPrefix("/api", configure -> true);
    }
}



### EXPLANATION ->

1. What is @Configuration?
@Configuration

Tells Spring:"This class contains application configuration." Spring loads this class during startup and executes the configuration methods inside it.

Without it, Spring would ignore the class.

2. What is WebMvcConfigurer?
public class WebConfig implements WebMvcConfigurer

WebMvcConfigurer is an interface provided by Spring.

It allows you to customize Spring MVC behavior.

Examples:
Add interceptors
Configure CORS
Configure path matching
Configure message converters
Configure API versioning

Without implementing it, Spring uses default behavior.