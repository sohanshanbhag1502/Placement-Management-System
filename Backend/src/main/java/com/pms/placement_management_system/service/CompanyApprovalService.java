package com.pms.placement_management_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pms.placement_management_system.model.Admin;
import com.pms.placement_management_system.model.ApprovalStatus;
import com.pms.placement_management_system.model.CompanyApproval;
import com.pms.placement_management_system.repository.CompanyApprovalRepository;
import com.pms.placement_management_system.model.Company;
import java.util.Optional;

@Service
public class CompanyApprovalService {
    
    @Autowired
    private CompanyApprovalRepository companyApprovalRepository;

    public void requestApproval(Company company) {
        CompanyApproval newCompanyApproval = new CompanyApproval(company, ApprovalStatus.PENDING);
        companyApprovalRepository.save(newCompanyApproval);
    }

    public void approveCompany(Company company, Admin admin) {
        Optional<CompanyApproval> companyApproval = companyApprovalRepository.findByCompany(company);
        if (companyApproval.isPresent()) {
            CompanyApproval approval = companyApproval.get();
            approval.setAdmin(admin);
            approval.setStatus(ApprovalStatus.APPROVED);
            companyApprovalRepository.save(approval);
        }
    }
    public void rejectCompany(Company company, Admin admin) {
        Optional<CompanyApproval> companyApproval = companyApprovalRepository.findByCompany(company);
        if (companyApproval.isPresent()) {
            CompanyApproval approval = companyApproval.get();
            approval.setAdmin(admin);
            approval.setStatus(ApprovalStatus.REJECTED);
            companyApprovalRepository.save(approval);
        }
    }
}
