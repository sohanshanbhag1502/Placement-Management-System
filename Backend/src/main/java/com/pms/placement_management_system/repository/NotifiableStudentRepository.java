package com.pms.placement_management_system.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.pms.placement_management_system.model.*;
import java.util.*;

@Repository
public interface NotifiableStudentRepository extends JpaRepository<NotifiableStudent, String>{
    public Optional<NotifiableStudent> findByStudentEmail(String studentEmail);
}
