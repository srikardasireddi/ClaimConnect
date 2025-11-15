package com.claimconnect.insurancecompanyservice.service;

import com.claimconnect.insurancecompanyservice.model.InsurancePolicy;
import com.claimconnect.insurancecompanyservice.repository.InsurancePolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InsurancePolicyService {

    @Autowired
    private InsurancePolicyRepository policyRepository;

    public List<InsurancePolicy> getAllPolicies() {
        return policyRepository.findAll();
    }

    public Optional<InsurancePolicy> getPolicyById(Long id) {
        return policyRepository.findById(id);
    }
    
    public Optional<InsurancePolicy> getPolicyByPatientId(Long patientId) {
        return policyRepository.findByPatientId(patientId);
    }

    public InsurancePolicy createPolicy(InsurancePolicy policy) {
        return policyRepository.save(policy);
    }
}