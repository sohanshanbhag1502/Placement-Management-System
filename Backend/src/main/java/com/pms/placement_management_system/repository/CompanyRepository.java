package com.pms.placement_management_system.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.pms.placement_management_system.model.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    
}
