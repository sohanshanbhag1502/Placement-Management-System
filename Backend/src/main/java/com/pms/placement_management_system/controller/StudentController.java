package com.pms.placement_management_system.controller;

import org.springframework.web.bind.annotation.*;

import com.pms.placement_management_system.design_patterns.InterviewFacade;
import com.pms.placement_management_system.model.InterviewSchedule;
import com.pms.placement_management_system.model.JobApplication;
import com.pms.placement_management_system.model.JobOpening;
import com.pms.placement_management_system.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import java.util.*;

@RestController
@RequestMapping(path="/api/student", produces = "application/json")
@CrossOrigin(origins = "*")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private InterviewFacade interviewFacade;

    @PostMapping("/register")
    public ResponseEntity<String> registerStudent(@RequestBody Map<String, String> reqBody) {
        String msg = studentService.registerUser(reqBody);
        if (msg.contains("already exists")){
            return ResponseEntity.status(409).body(msg);
        } else {
            return ResponseEntity.status(HttpStatus.CREATED).body(msg);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginStudent(@RequestBody Map<String, String> reqBody) {
        String msg = studentService.loginUser(reqBody);
        if (msg.contains("not found")){
            return ResponseEntity.status(409).body("{\"message\": \"Student not found\"}");
        } 
        else if (msg.contains("Invalid")){
            return ResponseEntity.status(401).body("{\"message\": \"Invalid password\"}");
        } else {
            return ResponseEntity.status(200).body("{\"message\": \"Login successfull\", \"token\": \""+msg+"\"}");
        }
    }

    @PostMapping("/applyForJob/{token}")
    public ResponseEntity<String> applyForJob(
        @PathVariable String token,
        @RequestBody Map<String, String> reqBody
    ) {
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(401).body("{\"message\":\"Unauthorized\"}");
        }

        String msg = studentService.applyForJob(token, reqBody.get("jobId"));
        if (msg.contains("not found")){
            return ResponseEntity.status(404).body(msg);
        } else {
            return ResponseEntity.status(200).body(msg);
        }
    }

    @PostMapping("/getJobDetails/{token}")
    public ResponseEntity<JobOpening> getJobDetails(
        @PathVariable String token,
        @RequestBody Map<String, String> reqBody
    ) {
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(401).body(null);
        }

        JobOpening job = studentService.getJobDetails(reqBody.get("jobId"));
        return ResponseEntity.ok(job);
    }

    @PostMapping("/getAllJobOpenings/{token}")
    public ResponseEntity<List<JobOpening>> getAllJobOpenings(
        @PathVariable String token
    ) {
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(401).body(Collections.emptyList());
        }

        List<JobOpening> openings = studentService.getAllJobOpenings();
        return ResponseEntity.ok(openings);
    }

    @PostMapping("/getAllApplications/{token}")
    public ResponseEntity<List<JobApplication>> getAllApplications(
        @PathVariable String token
    ) {
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(401).body(Collections.emptyList());
        }

        List<JobApplication> applications = studentService.getAllApplications(token);
        return ResponseEntity.ok(applications);
    }

    @PostMapping("/requestInterviewReschedule/{token}")
    public ResponseEntity<String> requestInterviewReschedule(
        @RequestBody Map<String, String> reqBody,
        @PathVariable String token
    ) {
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(401).body("{\"message\":\"Unauthorized\"}");
        }

        String msg = interviewFacade.requestReScheduleInterview(reqBody.get("interviewId"), reqBody.get("newDate"), reqBody.get("newTime"));

        if (msg.contains("not found")){
            return ResponseEntity.status(404).body(msg);
        } else {
            return ResponseEntity.status(200).body(msg);
        }
    }

    @PostMapping("/getAllInterviews/{token}")
    public ResponseEntity<List<InterviewSchedule>> getAllInterviews(
        @PathVariable String token
    ) {
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(401).body(Collections.emptyList());
        }

        List<InterviewSchedule> schedules = interviewFacade.getAllInterviews(token);

        return ResponseEntity.ok(schedules);
    }
}
