package com.pms.placement_management_system.design_patterns;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.pms.placement_management_system.model.*;
import com.pms.placement_management_system.service.*;
import java.util.*;

@Component
public class CompanyApprovalFacade {
    @Autowired
    private CompanyApprovalService companyApprovalService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private AdminService adminService;

    private CompanyApprovalFacade() {
    }

    public void requestForApproval(Company company) {
        companyApprovalService.requestApproval(company);
    }

    public String approveCompany(String companyId, String adminId) {
        Company company = companyService.getCompanyProfile(Long.parseLong(companyId));
        if (company == null) {
            return "{\"message\": \"Company not found\"}";
        }

        Admin admin = adminService.getAdminProfile(adminId);
        if (admin == null) {
            return "{\"message\": \"Admin not found\"}";
        }
        companyApprovalService.approveCompany(company, admin);

        return "{\"message\": \"Company approved successfully\"}";
    }

    public String rejectCompany(String companyId, String adminId) {
        Company company = companyService.getCompanyProfile(Long.parseLong(companyId));
        if (company == null) {
            return "{\"message\": \"Company not found\"}";
        }

        Admin admin = adminService.getAdminProfile(adminId);
        if (admin == null) {
            return "{\"message\": \"Admin not found\"}";
        }
        companyApprovalService.rejectCompany(company, admin);

        return "{\"message\": \"Company rejected\"}";
    }

}
