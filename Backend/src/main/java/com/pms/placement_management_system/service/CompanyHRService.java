package com.pms.placement_management_system.service;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pms.placement_management_system.model.*;
import com.pms.placement_management_system.repository.*;
import com.pms.placement_management_system.design_patterns.JobOpeningObserver;

@Service
public class CompanyHRService implements UserService{

    @Autowired
    private CompanyHRRepository companyHRRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private JobOpeningRepository jobOpeningRepository;

    @Autowired
    private JobOpeningObserver jobOpeningObserver;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    private static CompanyHRService instance = null;

    public static synchronized CompanyHRService getInstance(){
        if (instance == null) {
            instance = new CompanyHRService();
        }
        return instance;
    }

    public String registerUser(Map<String, String> companyHR){
        Optional<Company> company = companyRepository.findById(Long.parseLong(companyHR.get("companyId")));

        if (!company.isPresent()) {
            return "{\"message\":\"Company not found\"}";
        }

        Optional<CompanyHR> existingCompanyHR = companyHRRepository.findById(companyHR.get("email"));
        if (existingCompanyHR.isPresent()) {
            return "{\"message\":\"Company HR already exists\"}";
        }

        CompanyHR newCompanyHR = new CompanyHR(
            companyHR.get("name"),
            companyHR.get("email"),
            companyHR.get("password"),
            companyHR.get("contactNumber"),
            companyHR.get("address"),
            companyHR.get("designation"),
            company.get()
        );

        companyHRRepository.save(newCompanyHR);

        return "{\"message\":\"Company HR registered successfully\"}";
    }

    public String loginUser(Map<String, String> companyHR){
        Optional<CompanyHR> existingCompanyHR = companyHRRepository.findById(companyHR.get("email"));
        if (!existingCompanyHR.isPresent()) {
            return "{\"message\":\"Company HR not found\"}";
        }

        if (!existingCompanyHR.get().getPassword().equals(companyHR.get("password"))) {
            return "{\"message\":\"Incorrect password\"}";
        }

        return "{\"message\":\"Login Success\", \"token\":\""+companyHR.get("email")+"\"}";
    }

    public String postJobOpening(String email, Map<String, String> jobOpeningDetails) {
        Optional<CompanyHR> existingCompanyHR = companyHRRepository.findById(email);

        if (!existingCompanyHR.isPresent()) {
            return "{\"message\":\"Company HR not found\"}";
        }

        CompanyHR companyHR = existingCompanyHR.get();
        
        JobOpening jobOpening = new JobOpening(
            jobOpeningDetails.get("title"),
            jobOpeningDetails.get("description"),
            jobOpeningDetails.get("location"),
            jobOpeningDetails.get("salary"),
            jobOpeningDetails.get("requirements"),
            jobOpeningDetails.get("jobType"),
            companyHR.getCompany(),
            jobOpeningDetails.get("datePosted"),
            jobOpeningDetails.get("deadline"),
            companyHR
        );
        jobOpeningRepository.save(jobOpening);

        jobOpeningObserver.notifyStudents(jobOpening);

        return "{\"message\":\"Job opening posted successfully\"}";
    }

    public CompanyHR getHr(String email){
        Optional<CompanyHR> hr = companyHRRepository.findByEmail(email);
        if (!hr.isPresent())
            return null;
        return hr.get();
    }

    public List<JobApplication> getJobApplications(String jobId) {
        Optional<JobOpening> jobOpenings = jobOpeningRepository.findById(Long.parseLong(jobId));

        if (!jobOpenings.isPresent()) {
            return Collections.emptyList();
        }

        List<JobApplication> jobApplications = jobApplicationRepository.findByJob(jobOpenings.get());

        return jobApplications;
    }

    public JobApplication getJobApplication(String applicationId) {
        Optional<JobApplication> jobApplication = jobApplicationRepository.findById(Long.parseLong(applicationId));

        if (!jobApplication.isPresent()) {
            return null;
        }

        return jobApplication.get();
    }

    public List<JobOpening> getJobOpenings(String email) {
        Optional<CompanyHR> existingCompanyHR = companyHRRepository.findById(email);

        if (!existingCompanyHR.isPresent()) {
            return new ArrayList<JobOpening>();
        }

        CompanyHR companyHR = existingCompanyHR.get();
        List<JobOpening> jobOpenings = jobOpeningRepository.findByHrAndCompany(companyHR, companyHR.getCompany());

        return jobOpenings;
    }

    public String getAllJobOpenings(String email) {
        Optional<CompanyHR> existingCompanyHR = companyHRRepository.findById(email);

        if (!existingCompanyHR.isPresent()) {
            return "{\"message\":\"Company HR not found\"}";
        }

        CompanyHR companyHR = existingCompanyHR.get();
        List<JobOpening> jobOpenings = jobOpeningRepository.findByCompany(companyHR.getCompany());

        return "{\"message\":\""+jobOpenings+"\"}";
    }

    public boolean verifyToken(String email) {
        Optional<CompanyHR> existingAdmin = companyHRRepository.findByEmail(email);
        return existingAdmin.isPresent();
    }
}