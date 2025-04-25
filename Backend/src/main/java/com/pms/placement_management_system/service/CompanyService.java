package com.pms.placement_management_system.service;

import com.pms.placement_management_system.model.Company;
import org.springframework.stereotype.Service;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.pms.placement_management_system.repository.CompanyRepository;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public Company registerCompany(Map<String, String> company) {
        Company newCompany = new Company(
                company.get("name"),
                company.get("email"),
                company.get("contactNumber"),
                company.get("address"),
                company.get("website"),
                company.get("description"),
                company.get("logoUrl")
        );
        companyRepository.save(newCompany);
        return newCompany;
    }

    public Company getCompanyProfile(Long companyId){
        Optional<Company> existingCompany = companyRepository.findById(companyId);
        if (existingCompany.isPresent()) {
            Company companyObj = existingCompany.get();
            return companyObj;
        } else {
            return null;
        }
    }
}