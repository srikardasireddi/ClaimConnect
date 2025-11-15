package com.claimconnect.claimrequestservice.dto;

import java.time.LocalDate;

// This is the object our Controller will accept to create a new claim.
public class ClaimRequestDTO {

    private Long patientId;
    private Long hospitalId;
    private Double amount;
    private String description;

    // Getters and Setters
    public Long getPatientId() {
        return patientId;
    }
    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }
    public Long getHospitalId() {
        return hospitalId;
    }
    public void setHospitalId(Long hospitalId) {
        this.hospitalId = hospitalId;
    }
    public Double getAmount() {
        return amount;
    }
    public void setAmount(Double amount) {
        this.amount = amount;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}