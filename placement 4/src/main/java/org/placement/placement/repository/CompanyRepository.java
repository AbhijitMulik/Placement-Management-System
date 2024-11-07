package org.placement.placement.repository;
import java.util.List;

import org.placement.placement.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
    Company findByEmailAndPassword(String email, String password);
    List<Company> findByVerified(boolean verified);
}







