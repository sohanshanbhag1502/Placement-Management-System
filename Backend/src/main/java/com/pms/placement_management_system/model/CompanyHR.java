package com.pms.placement_management_system.model;

import jakarta.persistence.*;

@Entity
@Table(name = "CompanyHR")
public class CompanyHR {
    @Id
    private String email;

    private String name;
    private String password;
    private String contactNumber;
    private String address;
    private String designation;

    @JoinColumn(name = "companyId", referencedColumnName = "companyId")
    @ManyToOne
    private Company company;

    public CompanyHR() {
    }

    public CompanyHR(String name, String email, String password, String contactNumber, String address, String designation, Company company) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.contactNumber = contactNumber;
        this.address = address;
        this.designation = designation;
        this.company = company;
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

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}
