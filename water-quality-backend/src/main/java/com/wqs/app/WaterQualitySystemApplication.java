package com.wqs.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//(exclude = {
//        SecurityAutoConfiguration.class,
//        UserDetailsServiceAutoConfiguration.class
//})
public class WaterQualitySystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(WaterQualitySystemApplication.class, args);
    }
}
