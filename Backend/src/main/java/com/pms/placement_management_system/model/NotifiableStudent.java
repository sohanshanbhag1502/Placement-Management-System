package com.pms.placement_management_system.model;

import jakarta.persistence.*;

@Entity
@Table(name = "notifiable_students")
public class NotifiableStudent {
    @Id
    private String studentEmail;

    public NotifiableStudent() {
    }

    public NotifiableStudent(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }
}