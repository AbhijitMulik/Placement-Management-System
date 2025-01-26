package org.placement.placement.repository;

import org.placement.placement.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    List<Application> findByCompanyId(int companyId);
    boolean existsByStudentIdAndCompanyId(int studentId, int companyId);
}
