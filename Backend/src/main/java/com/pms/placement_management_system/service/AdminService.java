package com.pms.placement_management_system.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pms.placement_management_system.model.*;
import com.pms.placement_management_system.repository.*;
import com.pms.placement_management_system.repository.CompanyRepository;

import java.util.Optional;

@Service
public class AdminService implements UserService{

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CompanyApprovalRepository companyApprovalRepository;

    private static AdminService instance = null;

    public static synchronized AdminService getInstance(){
        if (instance == null) {
            instance = new AdminService();
        }
        return instance;
    }

    public String registerUser(Map<String, String> admin){
        System.out.println(""+admin);
        Admin newAdmin = new Admin(
            admin.get("name"), 
            admin.get("email"), 
            admin.get("phoneNumber"), 
            admin.get("password")
        );
        adminRepository.save(newAdmin);
        return "{\"message\": \"Admin registered successfully\"}";
    }

    public String loginUser(Map<String, String> admin){
        Optional<Admin> existingAdmin = adminRepository.findById(admin.get("email"));
        if (existingAdmin.isPresent()) {
            Admin adminObj = existingAdmin.get();
            if (adminObj.getPassword().equals(admin.get("password"))) {
                return adminObj.getEmail();
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public Admin getAdminProfile(String adminId){
        Optional<Admin> existingAdmin = adminRepository.findById(adminId);
        if (existingAdmin.isPresent()) {
            Admin adminObj = existingAdmin.get();
            return adminObj;
        } else {
            return null;
        }
    }

    public boolean verifyToken(String token) {
        String email = token;
        Optional<Admin> existingAdmin = adminRepository.findByEmail(email);
        if (existingAdmin.isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    public List<CompanyApproval> getAllCompanies() {
        return companyApprovalRepository.findByStatus(ApprovalStatus.PENDING);
    }

    public Company getCompanyDetails(String companyId) {
        Optional<Company> existingCompany = companyRepository.findById(Long.parseLong(companyId));
        if (existingCompany.isPresent()) {
            return existingCompany.get();
        } else {
            return null;
        }
    }
}
