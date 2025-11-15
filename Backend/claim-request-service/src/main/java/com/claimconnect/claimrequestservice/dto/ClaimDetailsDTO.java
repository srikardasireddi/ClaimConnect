package com.claimconnect.claimrequestservice.dto;

import com.claimconnect.claimrequestservice.model.Claim;

// This is the full, detailed object we will return to the user.
public class ClaimDetailsDTO {
    
    private Claim claim;
    private PatientDTO patient;
    private HospitalDTO hospital;

    // Getters and Setters
    public Claim getClaim() {
        return claim;
    }
    public void setClaim(Claim claim) {
        this.claim = claim;
    }
    public PatientDTO getPatient() {
        return patient;
    }
    public void setPatient(PatientDTO patient) {
        this.patient = patient;
    }
    public HospitalDTO getHospital() {
        return hospital;
    }
    public void setHospital(HospitalDTO hospital) {
        this.hospital = hospital;
    }
}