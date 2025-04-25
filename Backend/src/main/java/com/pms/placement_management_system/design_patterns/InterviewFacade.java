package com.pms.placement_management_system.design_patterns;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.pms.placement_management_system.repository.InterviewScheduleRepository;
import com.pms.placement_management_system.model.*;
import java.util.*;

@Component
public class InterviewFacade {

    @Autowired
    private InterviewScheduleRepository interviewScheduleRepository;

    public String notifyInterview(String candidateEmail, InterviewSchedule schedule) {
        return "Interview scheduled for " + candidateEmail + " on " + schedule.getDate() + " at " + schedule.getTime() +
                ". Meeting mode: " + schedule.getMeetingMode() + ". Meeting link: " + schedule.getMeetingLink() +
                ". Interviewer: " + schedule.getInterviewer() + ". HR: " + schedule.getHrEmail();
    }

    public String requestReScheduleInterview(String interviewId, String newDate, String newTime) {
        Optional<InterviewSchedule> interviewSchedule = interviewScheduleRepository.findById(Long.parseLong(interviewId));

        if (!interviewSchedule.isPresent()) {
            return "{\"message\" : \"No interview scheduled \"}";
        }

        InterviewSchedule schedule = interviewSchedule.get();
        schedule.setRescheduleRequested(true);
        schedule.setNewDate(newDate);
        schedule.setNewTime(newTime);
        interviewScheduleRepository.save(schedule);

        return "{\"message\" : \""+"Re-schedule request sent for interview on " + schedule.getDate() + " at " + schedule.getTime() +"\"}";
    }

    public List<InterviewSchedule> getAllInterviews(String candidateEmail) {
        List<InterviewSchedule> interviewSchedules = interviewScheduleRepository.findByStudentEmail(candidateEmail);

        return interviewSchedules;
    }

    public List<InterviewSchedule> getAllHrInterviews(String hrEmail) {
        List<InterviewSchedule> interviewSchedules = interviewScheduleRepository.findByHrEmail(hrEmail);

        return interviewSchedules;
    }

    public List<InterviewSchedule> getAllRescheduleRequest(String hrEmail) {
        List<InterviewSchedule> interviewSchedules = interviewScheduleRepository.findByHrEmailAndRescheduleRequested(hrEmail, true);

        return interviewSchedules;
    }

    public String approveReScheduleInterview(String interviewId) {
        Optional<InterviewSchedule> interviewSchedule = interviewScheduleRepository.findById(Long.parseLong(interviewId));

        if (!interviewSchedule.isPresent()) {
            return "{\"message\" : \"No interview scheduled\"}";
        }

        InterviewSchedule schedule = interviewSchedule.get();
        schedule.setRescheduleRequested(false);
        schedule.setDate(schedule.getNewDate());
        schedule.setTime(schedule.getNewTime());
        schedule.setNewDate(null);
        schedule.setNewTime(null);
        interviewScheduleRepository.save(schedule);
        this.notifyInterview(schedule.getStudentEmail(), schedule);

        return "{\"message\" : \""+"Re-schedule approved for interview on " + schedule.getDate() + " at " + schedule.getTime()+"\"}";
    }

    public String rejectReScheduleInterview(String interviewId) {
        Optional<InterviewSchedule> interviewSchedule = interviewScheduleRepository.findById(Long.parseLong(interviewId));

        if (!interviewSchedule.isPresent()) {
            return "{\"message\" : \"No interview scheduled\"}";
        }

        InterviewSchedule schedule = interviewSchedule.get();
        schedule.setRescheduleRequested(false);
        schedule.setNewDate(null);
        schedule.setNewTime(null);
        interviewScheduleRepository.save(schedule);

        return "{\"message\" : \"Re-schedule rejected for interview \"}";
    }

    public void scheduleInterview(Map<String, String> reqBody, CompanyHR hr) {
        InterviewSchedule interviewSchedule = new InterviewSchedule(
            reqBody.get("Date"),
            reqBody.get("Time"),
            MeetingMode.valueOf(reqBody.get("meetingMode")),
            reqBody.get("meetingLink"),
            reqBody.get("interviewer"),
            reqBody.get("candidateEmail"),
            hr.getEmail()
        );
        interviewScheduleRepository.save(interviewSchedule);
        this.notifyInterview(reqBody.get("candidateEmail"), interviewSchedule);
    }
}