package com.claimconnect.claimrequestservice.client;

import com.claimconnect.claimrequestservice.dto.HospitalDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

// The name "HOSPITALSERVICE" MUST match the name in Eureka.
@FeignClient(name = "HOSPITALSERVICE")
public interface HospitalClient {

    // This tells Feign to make a GET request to the
    // "HOSPITALSERVICE" at the path "/api/hospitals/{id}"
    @GetMapping("/api/hospitals/{id}")
    public HospitalDTO getHospitalById(@PathVariable("id") Long id);
}