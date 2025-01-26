package org.placement.placement.controller;

import org.placement.placement.entity.PlacementCoordinator;
import org.placement.placement.request.LoginRequest;
import org.placement.placement.service.PlacementCoordinatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/pcs")
public class PlacementCoordinatorController {

    @Autowired
    private PlacementCoordinatorService placementCoordinatorService;

    // Login method to validate email and password
    @PostMapping("/login")
    public ResponseEntity<PlacementCoordinator> login(@RequestBody LoginRequest loginRequest) {
        PlacementCoordinator authenticatedPC = placementCoordinatorService.authenticatePC(loginRequest.getEmail(), loginRequest.getPassword());
        if (authenticatedPC != null) {
            return ResponseEntity.ok(authenticatedPC);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    // Signup method for creating a new placement coordinator
    @PostMapping("/signup")
    public ResponseEntity<PlacementCoordinator> signup(@RequestBody PlacementCoordinator placementCoordinator) {
        PlacementCoordinator newPC = placementCoordinatorService.addPC(placementCoordinator);
        return ResponseEntity.status(HttpStatus.CREATED).body(newPC);
    }

    // Get placement coordinator profile by ID
    @GetMapping("/{id}")
    public ResponseEntity<PlacementCoordinator> getPCById(@PathVariable int id) {
        PlacementCoordinator pc = placementCoordinatorService.getPCById(id);
        if (pc != null) {
            return ResponseEntity.ok(pc);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Update placement coordinator profile by ID
    @PutMapping("/{id}")
    public ResponseEntity<PlacementCoordinator> updatePC(@PathVariable int id, @RequestBody PlacementCoordinator pcDetails) {
        PlacementCoordinator updatedPC = placementCoordinatorService.updatePC(id, pcDetails);
        if (updatedPC != null) {
            return ResponseEntity.ok(updatedPC);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    
}
