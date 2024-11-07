package org.placement.placement.service;

import org.placement.placement.entity.Company;
import org.placement.placement.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    // Save Company (Signup)
    public Company addCompany(Company company) {
        return companyRepository.save(company);
    }

    // Authenticate company by email and password
    public Company authenticateCompany(String email, String password) {
        return companyRepository.findByEmailAndPassword(email, password);
    }

    // Fetch company profile by ID
    public Company getCompanyById(int id) {
        Optional<Company> company = companyRepository.findById(id);
        if (company.isPresent()) {
            System.out.println("Student found with ID: " + id);
            return company.get();
        } else {
            System.out.println("No student found with ID: " + id);
            return null;
        }
    }

    // Update company profile by ID
    public Company updateCompany(int id, Company companyDetails) {
        Optional<Company> companyOptional = companyRepository.findById(id);
        if (companyOptional.isPresent()) {
            Company company = companyOptional.get();
            company.setName(companyDetails.getName());
            company.setCompanyType(companyDetails.getCompanyType());
            company.setContactPerson(companyDetails.getContactPerson());
            company.setEmail(companyDetails.getEmail());
            company.setNoOfVacancies(companyDetails.getNoOfVacancies());
            company.setCriteriaCgpa(companyDetails.getCriteriaCgpa());
            company.setInterviewDate(companyDetails.getInterviewDate());
            return companyRepository.save(company);
        }
        return null;
    }


     // Fetch all companies
     public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    // Fetch verified companies
    public List<Company> getVerifiedCompanies() {
        return companyRepository.findByVerified(true);
    }

    // Verify a company
    public Company verifyCompany(int id) {
        return companyRepository.findById(id).map(company -> {
            company.setVerified(true);
            return companyRepository.save(company);
        }).orElse(null);
    }

}
