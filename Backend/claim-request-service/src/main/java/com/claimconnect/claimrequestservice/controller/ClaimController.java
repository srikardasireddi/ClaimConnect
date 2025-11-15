package com.claimconnect.claimrequestservice.controller;

import com.claimconnect.claimrequestservice.dto.ClaimDetailsDTO;
import com.claimconnect.claimrequestservice.dto.ClaimRequestDTO;
import com.claimconnect.claimrequestservice.model.Claim;
import com.claimconnect.claimrequestservice.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    // --- Test endpoint for your config server ---
    @Value("${greeting.message:DEFAULT - CONFIG NOT LOADED}")
    private String greetingMessage;

    @GetMapping("/hello-config")
    public String getConfigMessage() {
        return greetingMessage;
    }
    // --- End of test endpoint ---

    /**
     * Submits a new claim.
     */
    @PostMapping
    public ResponseEntity<Claim> submitClaim(@RequestBody ClaimRequestDTO claimRequest) {
        try {
            Claim newClaim = claimService.submitClaim(claimRequest);
            return new ResponseEntity<>(newClaim, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // This will catch errors if the Patient or Hospital ID is not found
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Gets a list of all claims (basic info).
     */
    @GetMapping
    public List<Claim> getAllClaims() {
        return claimService.getAllClaims();
    }

    /**
     * Gets a single claim with full patient and hospital details.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ClaimDetailsDTO> getClaimDetails(@PathVariable Long id) {
        try {
            ClaimDetailsDTO details = claimService.getClaimDetailsById(id);
            return ResponseEntity.ok(details);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}