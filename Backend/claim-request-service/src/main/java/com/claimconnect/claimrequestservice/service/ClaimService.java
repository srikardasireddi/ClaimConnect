package com.claimconnect.claimrequestservice.service;

import com.claimconnect.claimrequestservice.client.HospitalClient;
import com.claimconnect.claimrequestservice.client.PatientClient;
import com.claimconnect.claimrequestservice.dto.ClaimDetailsDTO;
import com.claimconnect.claimrequestservice.dto.ClaimRequestDTO;
import com.claimconnect.claimrequestservice.dto.HospitalDTO;
import com.claimconnect.claimrequestservice.dto.PatientDTO;
import com.claimconnect.claimrequestservice.model.Claim;
import com.claimconnect.claimrequestservice.repository.ClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;

    // Inject our new Feign clients
    @Autowired
    private PatientClient patientClient;

    @Autowired
    private HospitalClient hospitalClient;

    /**
     * Submits a new claim.
     * This method contacts the Patient and Hospital services to validate IDs.
     */
    public Claim submitClaim(ClaimRequestDTO claimRequest) {
        
        // 1. Call Patient Service to validate patient
        // We put this in a try-catch in case the ID is not found (which throws an error)
        try {
            PatientDTO patient = patientClient.getPatientById(claimRequest.getPatientId());
            if (patient == null) {
                throw new RuntimeException("Patient not found with ID: " + claimRequest.getPatientId());
            }
        } catch (Exception e) {
            throw new RuntimeException("Patient Service is down or patient not found", e);
        }

        // 2. Call Hospital Service to validate hospital
        try {
            HospitalDTO hospital = hospitalClient.getHospitalById(claimRequest.getHospitalId());
            if (hospital == null) {
                throw new RuntimeException("Hospital not found with ID: " + claimRequest.getHospitalId());
            }
        } catch (Exception e) {
            throw new RuntimeException("Hospital Service is down or hospital not found", e);
        }

        // 3. If both are valid, save the new claim
        Claim newClaim = new Claim();
        newClaim.setPatientId(claimRequest.getPatientId());
        newClaim.setHospitalId(claimRequest.getHospitalId());
        newClaim.setAmount(claimRequest.getAmount());
        newClaim.setDescription(claimRequest.getDescription());
        newClaim.setClaimDate(LocalDate.now());
        newClaim.setStatus("PENDING"); // Set default status

        return claimRepository.save(newClaim);
    }

    /**
     * Gets a single claim AND its full details from the other services.
     */
    public ClaimDetailsDTO getClaimDetailsById(Long id) {
        // 1. Find the basic claim from our local DB
        Claim claim = claimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim not found with ID: " + id));

        // 2. Call Patient Service to get patient details
        PatientDTO patient = patientClient.getPatientById(claim.getPatientId());

        // 3. Call Hospital Service to get hospital details
        HospitalDTO hospital = hospitalClient.getHospitalById(claim.getHospitalId());

        // 4. Combine them into one response object
        ClaimDetailsDTO details = new ClaimDetailsDTO();
        details.setClaim(claim);
        details.setPatient(patient);
        details.setHospital(hospital);

        return details;
    }

    // A simple method to get all claims (without full details)
    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }
}