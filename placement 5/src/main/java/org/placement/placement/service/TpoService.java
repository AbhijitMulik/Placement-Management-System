package org.placement.placement.service;

import org.placement.placement.entity.Company;
import org.placement.placement.entity.Tpo;
import org.placement.placement.repository.CompanyRepository;
import org.placement.placement.repository.TpoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TpoService {

    @Autowired
    private TpoRepository tpoRepository;

    @Autowired
    private CompanyRepository companyRepository;

    // Save TPO (Signup)
    public Tpo addTpo(Tpo tpo) {
        return tpoRepository.save(tpo);
    }

    // Authenticate TPO by email and password
    public Tpo authenticateTpo(String email, String password) {
        return tpoRepository.findByEmailAndPassword(email, password);
    }

    // Fetch TPO profile by ID
    public Tpo getTpoById(int id) {
        Optional<Tpo> tpo = tpoRepository.findById(id);
        if (tpo.isPresent()) {
            System.out.println("Student found with ID: " + id);
            return tpo.get();
        } else {
            System.out.println("No student found with ID: " + id);
            return null;
        }
    }

    // Update TPO profile by ID
    public Tpo updateTpo(int id, Tpo tpoDetails) {
        Optional<Tpo> tpoOptional = tpoRepository.findById(id);
        if (tpoOptional.isPresent()) {
            Tpo tpo = tpoOptional.get();
            tpo.setName(tpoDetails.getName());
            tpo.setEmail(tpoDetails.getEmail());
            tpo.setContactNo(tpoDetails.getContactNo());
            return tpoRepository.save(tpo);
        }
        return null;
    }


    // Fetch all companies
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    // Verify a company
    public Company verifyCompany(int id) {
        return companyRepository.findById(id).map(company -> {
            company.setVerified(true);
            return companyRepository.save(company);
        }).orElse(null);
    }
}
