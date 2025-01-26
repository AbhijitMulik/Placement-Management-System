package org.placement.placement.repository;

import org.placement.placement.entity.PlacementCoordinator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlacementCoordinatorRepository extends JpaRepository<PlacementCoordinator, Integer> {
    PlacementCoordinator findByEmailAndPassword(String email, String password);
}
