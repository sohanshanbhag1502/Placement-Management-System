package com.pms.placement_management_system.model;

import jakarta.persistence.*;

@Entity
@Table(name = "student")
public class Student {
    @Id
    private String email;

    private String name;
    private String dateOfBirth;
    private String password;
    private String phoneNumber;
    private String department;
    private Double cgpa;
    private String resumeUrl;
    private String linkedin;
    private String github;
    private String portfolioUrl;

    public Student() {
    }

    public Student(String name, String dateOfBirth, String email, String password, String phoneNumber, String department, Double cgpa, String resumeUrl, String linkedin, String github, String portfolioUrl) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.department = department;
        this.cgpa = cgpa;
        this.resumeUrl = resumeUrl;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.linkedin = linkedin;
        this.github = github;
        this.portfolioUrl = portfolioUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Double getCgpa() {
        return cgpa;
    }

    public void setCgpa(Double cgpa) {
        this.cgpa = cgpa;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLinkedin() {
        return linkedin;
    }

    public void setLinkedin(String linkedin) {
        this.linkedin = linkedin;
    }

    public String getGithub() {
        return github;
    }

    public void setGithub(String github) {
        this.github = github;
    }

    public String getPortfolioUrl() {
        return portfolioUrl;
    }

    public void setPortfolioUrl(String portfolioUrl) {
        this.portfolioUrl = portfolioUrl;
    }
}
