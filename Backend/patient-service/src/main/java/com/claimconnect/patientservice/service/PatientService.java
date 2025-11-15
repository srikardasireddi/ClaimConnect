package com.claimconnect.patientservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.claimconnect.patientservice.model.Patient;
import com.claimconnect.patientservice.repository.PatientRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    // Get all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Get a single patient by ID
    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    // Create a new patient
    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // Update an existing patient
    public Patient updatePatient(Long id, Patient patientDetails) {
        // First, find the existing patient
        Patient existingPatient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));

        // Now, update the fields
        existingPatient.setName(patientDetails.getName());
        existingPatient.setEmail(patientDetails.getEmail());
        existingPatient.setPhoneNumber(patientDetails.getPhoneNumber());
        existingPatient.setAddress(patientDetails.getAddress());

        // Save the updated patient back to the database
        return patientRepository.save(existingPatient);
    }

    // Delete a patient
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}