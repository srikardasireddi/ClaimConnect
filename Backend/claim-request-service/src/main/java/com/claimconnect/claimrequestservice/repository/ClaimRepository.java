package com.claimconnect.claimrequestservice.repository;

import com.claimconnect.claimrequestservice.model.Claim;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    // We can add methods like findByPatientId later
}