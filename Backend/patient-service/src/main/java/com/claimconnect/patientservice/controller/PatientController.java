package com.claimconnect.patientservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.claimconnect.patientservice.model.Patient;
import com.claimconnect.patientservice.service.PatientService;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;
 // Inject the property from your GitHub config file
 // TO:
    @Value("${greeting.message:DEFAULT - CONFIG NOT LOADED}")
    private String greetingMessage;

    // Create a new test endpoint
    @GetMapping("/hello-config")
    public String getConfigMessage() {
        return greetingMessage;
    }

    // GET all patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    // CREATE a new patient
    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        return patientService.createPatient(patient);
    }

    // GET a single patient by ID
    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id)
                .map(patient -> ResponseEntity.ok().body(patient))
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE a patient
    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patientDetails) {
        try {
            Patient updatedPatient = patientService.updatePatient(id, patientDetails);
            return ResponseEntity.ok(updatedPatient);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE a patient
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.ok().build();
    }
}