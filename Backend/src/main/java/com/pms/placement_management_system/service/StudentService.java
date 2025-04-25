package com.pms.placement_management_system.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pms.placement_management_system.design_patterns.ApplicationBuilder;
import com.pms.placement_management_system.model.*;
import com.pms.placement_management_system.repository.*;

@Service
public class StudentService implements UserService{

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private JobOpeningRepository jobOpeningRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    private static StudentService instance = null;

    public static synchronized StudentService getInstance(){
        if (instance == null) {
            instance = new StudentService();
        }
        return instance;
    }

    public String registerUser(Map<String, String> studentDetails){
        Optional<Student> existingStudent = studentRepository.findByEmail(studentDetails.get("email"));
        if (existingStudent.isPresent()) {
            return "{\"message\": \"Student already exists\"}";
        }

        Student student = new Student(
            studentDetails.get("name"),
            studentDetails.get("dateOfBirth"),
            studentDetails.get("email"),
            studentDetails.get("password"),
            studentDetails.get("phoneNumber"),
            studentDetails.get("department"),
            Double.parseDouble(studentDetails.get("cgpa")),
            studentDetails.get("resumeUrl"),
            studentDetails.get("linkedin"),
            studentDetails.get("github"),
            studentDetails.get("portfolioUrl")
        );
        studentRepository.save(student);

        return "{\"message\": \"Student registered successfully\"}";
    }

    public String loginUser(Map<String, String> studentDetails){
        Optional<Student> existingStudent = studentRepository.findByEmail(studentDetails.get("email"));
        if (!existingStudent.isPresent()) {
            return "not found";
        }

        Student student = existingStudent.get();
        if (!student.getPassword().equals(studentDetails.get("password"))) {
            return "Invalid credentials";
        }

        return student.getEmail();
    }

    public String applyForJob(String email, String jobId){
        Optional<Student> existingStudent = studentRepository.findByEmail(email);
        if (!existingStudent.isPresent()) {
            return "{\"message\": \"Student not found\"}";
        }

        Optional<JobOpening> jobOpening = jobOpeningRepository.findByJobId(Long.parseLong(jobId));

        if (!jobOpening.isPresent()) {
            return "{\"message\": \"Job opening not found\"}";
        }

        JobOpening job = jobOpening.get();
        
        ApplicationBuilder applicationBuilder = ApplicationBuilder.getInstance();
        JobApplication jobApplication = applicationBuilder.buildApplication(existingStudent.get(), job);

        jobApplicationRepository.save(jobApplication);

        return "{\"message\": \"Student applied successfully\"}";
    }

    public List<JobOpening> getAllJobOpenings(){
        List<JobOpening> jobOpenings = jobOpeningRepository.findAll();
        return jobOpenings;
    }

    public boolean verifyToken(String email) {
        Optional<Student> existingStudent = studentRepository.findByEmail(email);
        return existingStudent.isPresent();
    }

    public JobOpening getJobDetails(String jobId) {
        Optional<JobOpening> jobOpening = jobOpeningRepository.findByJobId(Long.parseLong(jobId));

        if (!jobOpening.isPresent()) {
            return null;
        }

        return jobOpening.get();
    }

    public List<JobApplication> getAllApplications(String email) {
        List<JobApplication> jobApplications = jobApplicationRepository.findByStudentEmail(email);

        return jobApplications;
    }
}
