package com.pms.placement_management_system.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pms.placement_management_system.design_patterns.CompanyApprovalFacade;
import com.pms.placement_management_system.model.Company;
import org.springframework.beans.factory.annotation.Autowired;
import com.pms.placement_management_system.service.*;
import java.util.Map;

@RestController
@RequestMapping(path="/api/company", produces = "application/json")
@CrossOrigin(origins = "*")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private CompanyApprovalFacade companyApprovalFacade;

    @PostMapping("/register")
    public ResponseEntity<String> registerCompany(@RequestBody Map<String, String> companyMap) {
        Company company = companyService.registerCompany(companyMap);

        companyApprovalFacade.requestForApproval(company);

        return ResponseEntity.status(201).body("Company registered successfully");
    }

}