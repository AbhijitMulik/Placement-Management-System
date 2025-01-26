package org.placement.placement.controller;

import java.util.List;

import org.placement.placement.entity.Application;
import org.placement.placement.entity.Company;
import org.placement.placement.service.ApplicationService;
import org.placement.placement.service.CompanyService;
import org.placement.placement.request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/companies")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private ApplicationService applicationService;

    // Login method to validate email and password
    @PostMapping("/login")
    public ResponseEntity<Company> login(@RequestBody LoginRequest loginRequest) {
        Company authenticatedCompany = companyService.authenticateCompany(loginRequest.getEmail(), loginRequest.getPassword());
        if (authenticatedCompany != null) {
            return ResponseEntity.ok(authenticatedCompany);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    // Signup method for creating a new company
    @PostMapping("/signup")
    public ResponseEntity<Company> signup(@RequestBody Company company) {
        Company newCompany = companyService.addCompany(company);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCompany);
    }

    // Get company profile by ID
    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable int id) {
        Company company = companyService.getCompanyById(id);
        if (company != null) {
            return ResponseEntity.ok(company);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Update company profile by ID
    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable int id, @RequestBody Company companyDetails) {
        Company updatedCompany = companyService.updateCompany(id, companyDetails);
        if (updatedCompany != null) {
            return ResponseEntity.ok(updatedCompany);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

   
    @GetMapping("/{id}/applications")
    public ResponseEntity<List<Application>> getApplicationsForCompany(@PathVariable int id) {
        List<Application> applications = applicationService.getApplicationsByCompanyId(id);
        if (applications != null && !applications.isEmpty()) {
            return ResponseEntity.ok(applications);
        } else {
            return ResponseEntity.noContent().build(); // Return 204 if no applications found
        }
    }

}
