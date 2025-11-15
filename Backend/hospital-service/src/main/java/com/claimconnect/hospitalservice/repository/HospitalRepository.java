package com.claimconnect.hospitalservice.repository;

import com.claimconnect.hospitalservice.model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {
    // This interface gives you findById(), findAll(), save(), delete(), etc.
}