package org.placement.placement.service;

import org.placement.placement.entity.PlacementCoordinator;
import org.placement.placement.repository.PlacementCoordinatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PlacementCoordinatorService {

    @Autowired
    private PlacementCoordinatorRepository placementCoordinatorRepository;

    // Save Placement Coordinator (Signup)
    public PlacementCoordinator addPC(PlacementCoordinator placementCoordinator) {
        return placementCoordinatorRepository.save(placementCoordinator);
    }

    // Authenticate placement coordinator by email and password
    public PlacementCoordinator authenticatePC(String email, String password) {
        return placementCoordinatorRepository.findByEmailAndPassword(email, password);
    }

    // Fetch placement coordinator profile by ID
    public PlacementCoordinator getPCById(int id) {
        Optional<PlacementCoordinator> pc = placementCoordinatorRepository.findById(id);
        if (pc.isPresent()) {
            System.out.println("Student found with ID: " + id);
            return pc.get();
        } else {
            System.out.println("No student found with ID: " + id);
            return null;
        }
    }

    // Update placement coordinator profile by ID
    public PlacementCoordinator updatePC(int id, PlacementCoordinator pcDetails) {
        Optional<PlacementCoordinator> pcOptional = placementCoordinatorRepository.findById(id);
        if (pcOptional.isPresent()) {
            PlacementCoordinator pc = pcOptional.get();
            pc.setName(pcDetails.getName());
            pc.setEmail(pcDetails.getEmail());
            pc.setDept(pcDetails.getDept());
            pc.setContactNo(pcDetails.getContactNo());
            return placementCoordinatorRepository.save(pc);
        }
        return null;
    }
}
