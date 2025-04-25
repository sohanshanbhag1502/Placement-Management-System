package com.pms.placement_management_system.model;

import jakarta.persistence.*;

@Entity
@Table(name = "CompanyApproval")
public class CompanyApproval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    @JoinColumn(name = "companyId", referencedColumnName = "companyId")
    @OneToOne
    private Company company;

    @JoinColumn(name = "email", referencedColumnName = "email")
    @OneToOne
    private Admin admin;

    @Enumerated(EnumType.STRING)
    private ApprovalStatus status;

    public CompanyApproval() {
    }

    public CompanyApproval(Company company, ApprovalStatus status) {
        this.company = company;
        this.status = status;
    }

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Admin getAdmin() {
        return admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }

    public ApprovalStatus getStatus() {
        return status;
    }

    public void setStatus(ApprovalStatus status) {
        this.status = status;
    }
}
