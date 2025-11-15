package com.claimconnect.claimrequestservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients; // <-- IMPORT THIS

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients // <-- ADD THIS TO ACTIVATE FEIGN
public class ClaimRequestServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClaimRequestServiceApplication.class, args);
    }

}