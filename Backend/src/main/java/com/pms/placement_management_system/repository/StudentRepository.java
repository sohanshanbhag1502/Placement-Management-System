package com.pms.placement_management_system.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.pms.placement_management_system.model.Student;
import java.util.*;

@Repository
public interface StudentRepository extends JpaRepository<Student, String>{
    public Optional<Student> findByEmail(String email);
}
