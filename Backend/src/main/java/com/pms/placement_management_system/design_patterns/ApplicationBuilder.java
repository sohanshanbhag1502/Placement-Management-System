package com.pms.placement_management_system.design_patterns;

import org.springframework.stereotype.Component;
import com.pms.placement_management_system.model.*;

@Component
public class ApplicationBuilder {
    
    private static ApplicationBuilder instance = null;

    private ApplicationBuilder() {
    }

    public static synchronized ApplicationBuilder getInstance() {
        if (instance != null) {
            return instance;
        }
        instance = new ApplicationBuilder();
        return instance;
    }

    public JobApplication buildApplication(Student student, JobOpening job) {
        JobApplication jobApplication = new JobApplication();
        jobApplication.setJob(job);
        jobApplication.setStatus(JobStatus.APPLIED);
        jobApplication.setStudentName(student.getName());
        jobApplication.setStudentEmail(student.getEmail());
        jobApplication.setStudentPhoneNumber(student.getPhoneNumber());
        jobApplication.setStudentDepartment(student.getDepartment());
        jobApplication.setStudentCGPA(student.getCgpa());
        jobApplication.setStudentResumeUrl(student.getResumeUrl());
        jobApplication.setStudentLinkedIn(student.getLinkedin());
        jobApplication.setStudentGitHub(student.getGithub());
        jobApplication.setStudentPortfolioUrl(student.getPortfolioUrl());

        return jobApplication;
    }
}
