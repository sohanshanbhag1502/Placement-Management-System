package com.pms.placement_management_system.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.pms.placement_management_system.model.CompanyHR;
import java.util.Optional;

@Repository
public interface CompanyHRRepository extends JpaRepository<CompanyHR, String> {
    public Optional<CompanyHR> findByEmail(String email);
}
