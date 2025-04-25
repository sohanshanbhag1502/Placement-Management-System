package com.pms.placement_management_system.model;

import jakarta.persistence.*;

@Entity
@Table(name = "JobOpening")
public class JobOpening{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobId;

    private String title;
    private String description;
    private String location;
    private String salary;
    private String requirements;
    private String jobType;
    private String deadline;
    private String datePosted;

    @ManyToOne
    @JoinColumn(name = "companyId", referencedColumnName = "companyId", nullable = false)
    private Company company;

    @ManyToOne
    @JoinColumn(name = "hrId", referencedColumnName = "email", nullable = false)
    private CompanyHR hr;

    public JobOpening() {
    }

    public JobOpening(String title, String description, String location, String salary, String requirements, String jobType, Company company, String datePosted, String deadline, CompanyHR hr) {
        this.hr = hr;
        this.title = title;
        this.description = description;
        this.location = location;
        this.salary = salary;
        this.requirements = requirements;
        this.jobType = jobType;
        this.company = company;
        this.datePosted = datePosted;
        this.deadline = deadline;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public String getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(String datePosted) {
        this.datePosted = datePosted;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public Long getJobId() {
        return jobId;
    }

    public CompanyHR getHr() {
        return hr;
    }

    public void setHr(CompanyHR hr) {
        this.hr = hr;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public String getJobType() {
        return jobType;
    }

}