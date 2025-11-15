package com.claimconnect.hospitalservice.controller;

import com.claimconnect.hospitalservice.model.Hospital;
import com.claimconnect.hospitalservice.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitals")
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;
    
    // Test endpoint for your config server
    @Value("${greeting.message:DEFAULT - CONFIG NOT LOADED}")
    private String greetingMessage;

    @GetMapping("/hello-config")
    public String getConfigMessage() {
        return greetingMessage;
    }

    // GET all hospitals
    @GetMapping
    public List<Hospital> getAllHospitals() {
        return hospitalService.getAllHospitals();
    }

    // CREATE a new hospital
    @PostMapping
    public Hospital createHospital(@RequestBody Hospital hospital) {
        return hospitalService.createHospital(hospital);
    }

    // GET a single hospital by ID
    @GetMapping("/{id}")
    public ResponseEntity<Hospital> getHospitalById(@PathVariable Long id) {
        return hospitalService.getHospitalById(id)
                .map(hospital -> ResponseEntity.ok().body(hospital))
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE a hospital
    @PutMapping("/{id}")
    public ResponseEntity<Hospital> updateHospital(@PathVariable Long id, @RequestBody Hospital hospitalDetails) {
        try {
            Hospital updatedHospital = hospitalService.updateHospital(id, hospitalDetails);
            return ResponseEntity.ok(updatedHospital);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE a hospital
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHospital(@PathVariable Long id) {
        hospitalService.deleteHospital(id);
        return ResponseEntity.ok().build();
    }
}