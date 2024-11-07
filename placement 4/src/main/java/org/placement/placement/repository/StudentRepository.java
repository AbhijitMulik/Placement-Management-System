package org.placement.placement.repository;

import org.placement.placement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    Student findByEmailAndPassword(String email, String password);
}
