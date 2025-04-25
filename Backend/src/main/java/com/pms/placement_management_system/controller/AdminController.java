package com.pms.placement_management_system.controller;

import org.springframework.web.bind.annotation.*;

import com.pms.placement_management_system.design_patterns.CompanyApprovalFacade;
import com.pms.placement_management_system.model.*;
import com.pms.placement_management_system.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import java.util.*;

@RestController
@RequestMapping(path="/api/admin", produces = "application/json")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private CompanyApprovalFacade companyApprovalFacade;

    @PostMapping("/register")
    public ResponseEntity<String> registerAdmin(@RequestBody Map<String, String> admin) {
        adminService.registerUser(admin);

        return ResponseEntity.ok("{\"message\": \"Admin registered successfully\"}");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginAdmin(@RequestBody Map<String, String> admin) {
        String token = adminService.loginUser(admin);
        
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        return ResponseEntity.ok("{\"message\": \"Login successful\", \"token\": \"" + token + "\"}");
    }

    @PostMapping("/getAllCompanies/{token}")
    public ResponseEntity<List<CompanyApproval>> getAllCompanies(
        @PathVariable String token
    ) {
        if (token == null || !adminService.verifyToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ArrayList<CompanyApproval>());
        }

        List<CompanyApproval> companies = adminService.getAllCompanies();
        System.out.println("Companies: " + companies);

        return ResponseEntity.ok(companies);
    }

    @PostMapping("/getCompanyDetails/{token}")
    public ResponseEntity<Company> getCompanyDetails(
        @PathVariable String token,
        @RequestBody Map<String, String> reqBody
    ) {
        String companyid = reqBody.get("companyId");

        if (token == null || !adminService.verifyToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Company());
        }

        return ResponseEntity.ok(adminService.getCompanyDetails(companyid));
    }

    @PostMapping("/approve/{token}")
    public ResponseEntity<String> approveCompany(
        @PathVariable String token,
        @RequestBody Map<String, String> reqBody
    ) {
        if (token == null || !adminService.verifyToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
        companyApprovalFacade.approveCompany(reqBody.get("companyId"), token);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("{\"message\":\"Company Approved\"}");
    }

    @PostMapping("/reject/{token}")
    public ResponseEntity<String> rejectCompany(
        @PathVariable String token,
        @RequestBody Map<String, String> reqBody
    ) {
        if (token == null || !adminService.verifyToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
        companyApprovalFacade.rejectCompany(reqBody.get("companyId"), token);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("{\"message\":\"Company Rejected\"}");
    }
}
