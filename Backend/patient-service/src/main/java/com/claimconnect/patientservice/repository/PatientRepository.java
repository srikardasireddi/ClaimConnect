package com.claimconnect.patientservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.claimconnect.patientservice.model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    // This interface is intentionally blank.
    // JpaRepository gives us all the methods we need.
}