package com.pms.placement_management_system.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import com.pms.placement_management_system.service.CompanyHRService;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;
import com.pms.placement_management_system.design_patterns.InterviewFacade;
import com.pms.placement_management_system.model.*;
import com.pms.placement_management_system.repository.JobApplicationRepository;

@RestController
@RequestMapping(path="/api/companyhr", produces = "application/json")
@CrossOrigin(origins = "*")
public class CompanyHRController {
    @Autowired
    private CompanyHRService companyHRService;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private InterviewFacade interviewFacade;

    @PostMapping("/register")
    public ResponseEntity<String> registerCompanyHR(@RequestBody Map<String, String> reqBody) {
        String message = companyHRService.registerUser(reqBody);
        if (message.contains("not found")) {
            return ResponseEntity.status(404).body(message);
        } else if (message.contains("already exists")) {
            return ResponseEntity.status(409).body(message);
        }
        return ResponseEntity.status(201).body(message);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginCompanyHR(@RequestBody Map<String, String> reqBody) {
        String message = companyHRService.loginUser(reqBody);
        if (message.contains("message") && message.contains("not found")) {
            return ResponseEntity.status(404).body(message);
        } else if (message.contains("message") && message.contains("Incorrect")) {
            return ResponseEntity.status(401).body(message);
        }
        
        return ResponseEntity.ok(message);
    }

    @PostMapping("/postJobOpening/{token}")
    public ResponseEntity<String> postJobOpening(
        @RequestBody Map<String, String> reqBody,
        @PathVariable String token
    ) {
        if (token == null || !companyHRService.verifyToken(token)) {
            return ResponseEntity.status(401).body("{\"message\":\"Unauthorized\"}");
        }

        String message = companyHRService.postJobOpening(token, reqBody);
        if (message.contains("not found")) {
            return ResponseEntity.status(404).body(message);
        }
        return ResponseEntity.status(200).body(message);
    }

    @PostMapping("/getJobOpenings/{token}")
    public ResponseEntity<List<JobOpening>> getJobOpenings(
        @PathVariable String token
    ) {
        if (token == null || !companyHRService.verifyToken(token)) {
            return ResponseEntity.ok(new ArrayList<JobOpening>());
        }

        List<JobOpening> openings = companyHRService.getJobOpenings(token);
        return ResponseEntity.ok(openings);
    }

    @PostMapping("/getJobApplications/{token}")
    public ResponseEntity<List<JobApplication>> getJobApplications(
        @PathVariable String token,
        @RequestBody Map<String, String> reqBody
    ) {
        if (token == null || !companyHRService.verifyToken(token)) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        System.out.println("" + reqBody);

        List<JobApplication> applications = companyHRService.getJobApplications(reqBody.get("jobId"));

        return ResponseEntity.ok(applications);
    }

    @PostMapping("/getJobApplication/{token}")
    public ResponseEntity<JobApplication> getJobApplication(
        @PathVariable String token,
        @RequestBody Map<String, String> reqBody
    ) {
        if (token == null || !companyHRService.verifyToken(token)) {
            return ResponseEntity.ok(null);
        }

        System.out.println("" + reqBody);

        JobApplication application = companyHRService.getJobApplication(reqBody.get("applicationId"));

        return ResponseEntity.ok(application);
    }

    @PostMapping("/getAllJobOpenings/{token}")
    public ResponseEntity<String> getAllJobOpenings(
        @PathVariable String token
    ) {
        if (token == null || !companyHRService.verifyToken(token)) {
            return ResponseEntity.status(401).body("{\"message\":\"Unauthorized\"}");
        }

        String message = companyHRService.getAllJobOpenings(token);
        if (message.contains("not found")) {
            return ResponseEntity.status(404).body(message);
        }
        return ResponseEntity.status(200).body(message);
    }

    @PostMapping("/getAllInterviews/{token}")
    public ResponseEntity<List<InterviewSchedule>> getAllInterviews(
        @PathVariable String token
    ) {
        if (token == null || !companyHRService.verifyToken(token)) {
            return ResponseEntity.status(401).body(Collections.emptyList());
        }

        List<InterviewSchedule> schedules = interviewFacade.getAllInterviews(token);
        return ResponseEntity.status(200).body(schedules);
    }

    @PostMapping("/getAllRescheduleRequest/{token}")
    public ResponseEntity<List<InterviewSchedule>> getAllRescheduleRequest(
        @PathVariable String token
    ) {
        if (token == null || !companyHRService.verifyToken(token)) {
            return ResponseEntity.status(401).body(Collections.emptyList());
        }

        List<InterviewSchedule> schedules = interviewFacade.getAllRescheduleRequest(token);
        return ResponseEntity.status(200).body(schedules);
    }

    @PostMapping("/scheduleInterview/{token}")
    public ResponseEntity<String> scheduleInterview(
        @PathVariable String token,
        @RequestBody Map<String, String> reqBody
    ) {
        if (token == null || !companyHRService.verifyToken(token)) {
            return ResponseEntity.status(401).body("{\"message\":\"Unauthorized\"}");
        }

        CompanyHR hr=companyHRService.getHr(token);

        Optional<JobApplication> application = jobApplicationRepository.findById(Long.parseLong(reqBody.get("applicationId")));

        if (!application.isPresent())
            return ResponseEntity.status(404).body("{\"message\":\"Application Not Found\"}");

        JobApplication app = application.get();
        app.setStatus(JobStatus.INTERVIEWED);
        jobApplicationRepository.save(app);

        interviewFacade.scheduleInterview(reqBody, hr);
        return ResponseEntity.status(200).body("{\"message\":\"Interview Scheduled\"}");
    }

    @PostMapping("/approveReschedule/{token}")
    public ResponseEntity<String> approveReschedule(
        @PathVariable String token,
        @RequestBody Map<String, String> reqBody
    ) {
        if (token == null || !companyHRService.verifyToken(token)) {
            return ResponseEntity.status(401).body("{\"message\":\"Unauthorized\"}");
        }

        String message = interviewFacade.approveReScheduleInterview(reqBody.get("interviewId"));
        if (message.contains("not found")) {
            return ResponseEntity.status(404).body(message);
        }
        return ResponseEntity.status(200).body(message);
    }

    @PostMapping("/rejectReschedule/{token}")
    public ResponseEntity<String> rejectReschedule(
        @PathVariable String token,
        @RequestBody Map<String, String> reqBody
    ) {
        if (token == null || !companyHRService.verifyToken(token)) {
            return ResponseEntity.status(401).body("{\"message\":\"Unauthorized\"}");
        }

        String message = interviewFacade.approveReScheduleInterview(reqBody.get("interviewId"));
        if (message.contains("not found")) {
            return ResponseEntity.status(404).body(message);
        }
        return ResponseEntity.status(200).body(message);
    }
}
