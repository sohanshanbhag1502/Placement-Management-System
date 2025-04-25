package com.pms.placement_management_system.model;

import jakarta.persistence.*;

@Entity
@Table(name = "interviewSchedule")
public class InterviewSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long interviewId;

    public String Date;
    public String Time;
    public MeetingMode meetingMode;
    public String meetingLink;
    public String interviewer;
    public boolean rescheduleRequested = false;
    public String newDate;
    public String newTime;
    private String studentEmail;
    private String hrEmail;

    public InterviewSchedule() {
    }

    public InterviewSchedule(String date, String time, MeetingMode meetingMode, String meetingLink, String interviewer, String studentEmail, String hrEmail) {
        Date = date;
        Time = time;
        this.meetingMode = meetingMode;
        this.meetingLink = meetingLink;
        this.interviewer = interviewer;
        this.studentEmail = studentEmail;
        this.hrEmail = hrEmail;
    }

    public Long getInterviewId() {
        return interviewId;
    }

    public void setInterviewId(Long interviewId) {
        this.interviewId = interviewId;
    }

    public String getDate() {
        return Date;
    }

    public void setDate(String date) {
        Date = date;
    }

    public String getTime() {
        return Time;
    }

    public void setTime(String time) {
        Time = time;
    }

    public MeetingMode getMeetingMode() {
        return meetingMode;
    }

    public void setMeetingMode(MeetingMode meetingMode) {
        this.meetingMode = meetingMode;
    }

    public String getMeetingLink() {
        return meetingLink;
    }

    public void setMeetingLink(String meetingLink) {
        this.meetingLink = meetingLink;
    }

    public String getInterviewer() {
        return interviewer;
    }

    public void setInterviewer(String interviewer) {
        this.interviewer = interviewer;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getHrEmail() {
        return hrEmail;
    }

    public void setHrEmail(String hrEmail) {
        this.hrEmail = hrEmail;
    }

    public boolean isRescheduleRequested() {
        return rescheduleRequested;
    }

    public void setRescheduleRequested(boolean rescheduleRequested) {
        this.rescheduleRequested = rescheduleRequested;
    }

    public String getNewDate() {
        return newDate;
    }

    public void setNewDate(String newDate) {
        this.newDate = newDate;
    }

    public String getNewTime() {
        return newTime;
    }

    public void setNewTime(String newTime) {
        this.newTime = newTime;
    }
}
