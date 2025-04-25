package com.pms.placement_management_system.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.pms.placement_management_system.model.*;
import java.util.*;

@Repository
public interface JobOpeningRepository extends JpaRepository<JobOpening, Long>{
    public List<JobOpening> findByHrAndCompany(CompanyHR hr, Company company);
    public List<JobOpening> findByCompany(Company company);
    public Optional<JobOpening> findByJobId(Long jobId);
}