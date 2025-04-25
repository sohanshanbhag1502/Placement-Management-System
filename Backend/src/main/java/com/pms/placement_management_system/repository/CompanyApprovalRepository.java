package com.pms.placement_management_system.repository;

import com.pms.placement_management_system.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface CompanyApprovalRepository extends JpaRepository<CompanyApproval, Long> {
    Optional<CompanyApproval> findByAdmin(Admin admin);
    Optional<CompanyApproval> findByCompany(Company company);
    List<CompanyApproval> findByStatus(ApprovalStatus status);
}
