package com.pms.placement_management_system.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.pms.placement_management_system.model.InterviewSchedule;

public interface InterviewScheduleRepository extends JpaRepository<InterviewSchedule, Long> {
    List<InterviewSchedule> findByStudentEmail(String studentEmail);
    List<InterviewSchedule> findByHrEmail(String hrEmail);
    List<InterviewSchedule> findByHrEmailAndRescheduleRequested(String hrEmail, boolean rescheduleRequested);
}