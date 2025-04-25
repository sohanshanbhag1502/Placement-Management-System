package com.pms.placement_management_system.repository;

import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.pms.placement_management_system.model.*;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long>{
    List<JobApplication> findByStudentEmail(String studentEmail);
    List<JobApplication> findByJob(JobOpening job);
    List<JobApplication> findAllByJobIn(List<JobOpening> jobs);
}
