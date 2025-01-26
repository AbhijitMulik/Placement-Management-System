package org.placement.placement.repository;

import org.placement.placement.entity.Tpo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TpoRepository extends JpaRepository<Tpo, Integer> {
    Tpo findByEmailAndPassword(String email, String password);
}
