package org.placement.placement.controller;

import java.util.List;

import org.placement.placement.entity.Company;
import org.placement.placement.entity.Tpo;
import org.placement.placement.request.LoginRequest;
import org.placement.placement.service.CompanyService;
import org.placement.placement.service.TpoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/tpos")
public class TpoController {

    @Autowired
    private TpoService tpoService;

    @Autowired
    private CompanyService companyService;

    // Login method to validate email and password
    @PostMapping("/login")
    public ResponseEntity<Tpo> login(@RequestBody LoginRequest loginRequest) {
        Tpo authenticatedTpo = tpoService.authenticateTpo(loginRequest.getEmail(), loginRequest.getPassword());
        if (authenticatedTpo != null) {
            return ResponseEntity.ok(authenticatedTpo);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    // Signup method for creating a new TPO
    @PostMapping("/signup")
    public ResponseEntity<Tpo> signup(@RequestBody Tpo tpo) {
        Tpo newTpo = tpoService.addTpo(tpo);
        return ResponseEntity.status(HttpStatus.CREATED).body(newTpo);
    }

    // Get TPO profile by ID
    @GetMapping("/{id}")
    public ResponseEntity<Tpo> getTpoById(@PathVariable int id) {
        Tpo tpo = tpoService.getTpoById(id);
        if (tpo != null) {
            return ResponseEntity.ok(tpo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Update TPO profile by ID
    @PutMapping("/{id}")
    public ResponseEntity<Tpo> updateTpo(@PathVariable int id, @RequestBody Tpo tpoDetails) {
        Tpo updatedTpo = tpoService.updateTpo(id, tpoDetails);
        if (updatedTpo != null) {
            return ResponseEntity.ok(updatedTpo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


     // Get all registered companies for verification
    @GetMapping("/companies")
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    // Verify a company by ID
    @PutMapping("/verifyCompany/{id}")
    public ResponseEntity<Company> verifyCompany(@PathVariable int id) {
        Company verifiedCompany = companyService.verifyCompany(id);
        if (verifiedCompany != null) {
            return ResponseEntity.ok(verifiedCompany);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
