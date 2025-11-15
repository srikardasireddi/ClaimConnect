package com.claimconnect.claimrequestservice.client;

import com.claimconnect.claimrequestservice.dto.PatientDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

// This interface is a Feign client.
// The name "PATIENTSERVICE" MUST match the name in Eureka.
@FeignClient(name = "PATIENTSERVICE")
public interface PatientClient {

    // This tells Feign to make a GET request to the
    // "PATIENTSERVICE" at the path "/api/patients/{id}"
    @GetMapping("/api/patients/{id}")
    public PatientDTO getPatientById(@PathVariable("id") Long id);
}