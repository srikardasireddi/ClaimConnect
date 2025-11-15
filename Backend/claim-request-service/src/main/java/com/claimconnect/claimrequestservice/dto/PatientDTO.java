package com.claimconnect.claimrequestservice.dto;

// This class is a "Data Transfer Object".
// It matches the structure of the Patient object from your Patient Service.
public class PatientDTO {
    private Long id;
    private String name;
    private String email;

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}