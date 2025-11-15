package com.claimconnect.insurancecompanyservice.controller;

import com.claimconnect.insurancecompanyservice.model.InsurancePolicy;
import com.claimconnect.insurancecompanyservice.service.InsurancePolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
public class InsurancePolicyController {

    @Autowired
    private InsurancePolicyService policyService;

    // Test endpoint for your config server
    @Value("${greeting.message:DEFAULT - CONFIG NOT LOADED}")
    private String greetingMessage;

    @GetMapping("/hello-config")
    public String getConfigMessage() {
        return greetingMessage;
    }

    // GET all policies
    @GetMapping
    public List<InsurancePolicy> getAllPolicies() {
        return policyService.getAllPolicies();
    }

    // CREATE a new policy
    @PostMapping
    public InsurancePolicy createPolicy(@RequestBody InsurancePolicy policy) {
        return policyService.createPolicy(policy);
    }

    // GET a single policy by its ID
    @GetMapping("/{id}")
    public ResponseEntity<InsurancePolicy> getPolicyById(@PathVariable Long id) {
        return policyService.getPolicyById(id)
                .map(policy -> ResponseEntity.ok().body(policy))
                .orElse(ResponseEntity.notFound().build());
    }

    // GET a policy by PATIENT ID
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<InsurancePolicy> getPolicyByPatientId(@PathVariable Long patientId) {
        return policyService.getPolicyByPatientId(patientId)
                .map(policy -> ResponseEntity.ok().body(policy))
                .orElse(ResponseEntity.notFound().build());
    }
}