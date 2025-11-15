package com.claimconnect.hospitalservice.service;

import com.claimconnect.hospitalservice.model.Hospital;
import com.claimconnect.hospitalservice.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;

    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    public Optional<Hospital> getHospitalById(Long id) {
        return hospitalRepository.findById(id);
    }

    public Hospital createHospital(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    public Hospital updateHospital(Long id, Hospital hospitalDetails) {
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hospital not found with id: " + id));

        hospital.setName(hospitalDetails.getName());
        hospital.setAddress(hospitalDetails.getAddress());
        hospital.setCity(hospitalDetails.getCity());
        hospital.setState(hospitalDetails.getState());
        hospital.setZipCode(hospitalDetails.getZipCode());

        return hospitalRepository.save(hospital);
    }

    public void deleteHospital(Long id) {
        hospitalRepository.deleteById(id);
    }
}