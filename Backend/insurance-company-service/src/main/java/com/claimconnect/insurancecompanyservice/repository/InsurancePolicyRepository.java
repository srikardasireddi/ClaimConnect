package com.claimconnect.insurancecompanyservice.repository;

import com.claimconnect.insurancecompanyservice.model.InsurancePolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface InsurancePolicyRepository extends JpaRepository<InsurancePolicy, Long> {
    
    // We will need this method later to find a policy for a specific patient
    Optional<InsurancePolicy> findByPatientId(Long patientId);
}