package com.pms.placement_management_system.model;

import jakarta.persistence.*;

@Entity
@Table(name = "JobApplication")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;

    private String studentName;
    private String studentEmail;
    private String studentPhoneNumber;
    private String studentDepartment;
    private Double studentCGPA;
    private String studentResumeUrl;
    private String studentLinkedIn;
    private String studentGitHub;
    private String studentPortfolioUrl;

    @ManyToOne
    @JoinColumn(name = "job_id", referencedColumnName = "jobId", nullable = false)
    private JobOpening job;

    @Enumerated(EnumType.STRING)
    private JobStatus status;

    public JobApplication() {
    }

    public JobApplication(String studentName, String studentEmail, String studentPhoneNumber, String studentDepartment,
                          Double studentCGPA, String studentResumeUrl, String studentLinkedIn, String studentGitHub,
                          String studentPortfolioUrl, JobOpening job, JobStatus status) {
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.studentPhoneNumber = studentPhoneNumber;
        this.studentDepartment = studentDepartment;
        this.studentCGPA = studentCGPA;
        this.studentResumeUrl = studentResumeUrl;
        this.studentLinkedIn = studentLinkedIn;
        this.studentGitHub = studentGitHub;
        this.studentPortfolioUrl = studentPortfolioUrl;
        this.job = job;
        this.status = status;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public JobOpening getJob() {
        return job;
    }

    public void setJob(JobOpening job) {
        this.job = job;
    }

    public JobStatus getStatus() {
        return status;
    }

    public void setStatus(JobStatus status) {
        this.status = status;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getStudentPhoneNumber() {
        return studentPhoneNumber;
    }

    public void setStudentPhoneNumber(String studentPhoneNumber) {
        this.studentPhoneNumber = studentPhoneNumber;
    }

    public String getStudentDepartment() {
        return studentDepartment;
    }

    public void setStudentDepartment(String studentDepartment) {
        this.studentDepartment = studentDepartment;
    }

    public Double getStudentCGPA() {
        return studentCGPA;
    }

    public void setStudentCGPA(Double studentCGPA) {
        this.studentCGPA = studentCGPA;
    }

    public String getStudentResumeUrl() {
        return studentResumeUrl;
    }

    public void setStudentResumeUrl(String studentResumeUrl) {
        this.studentResumeUrl = studentResumeUrl;
    }

    public String getStudentLinkedIn() {
        return studentLinkedIn;
    }

    public void setStudentLinkedIn(String studentLinkedIn) {
        this.studentLinkedIn = studentLinkedIn;
    }

    public String getStudentGitHub() {
        return studentGitHub;
    }

    public void setStudentGitHub(String studentGitHub) {
        this.studentGitHub = studentGitHub;
    }

    public String getStudentPortfolioUrl() {
        return studentPortfolioUrl;
    }

    public void setStudentPortfolioUrl(String studentPortfolioUrl) {
        this.studentPortfolioUrl = studentPortfolioUrl;
    }
}
