package com.pms.placement_management_system.design_patterns;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.pms.placement_management_system.model.*;
import com.pms.placement_management_system.repository.NotifiableStudentRepository;
import java.util.Optional;

@Component
public class JobOpeningObserver {
    
    @Autowired
    private NotifiableStudentRepository notifiableStudentRepository;

    public void addStudent(Student student){
        NotifiableStudent notifiableStudent = new NotifiableStudent(student.getEmail());
        notifiableStudentRepository.save(notifiableStudent);
    }

    public void removeStudent(Student student){
        Optional<NotifiableStudent> notifiableStudent = notifiableStudentRepository.findByStudentEmail(student.getEmail());
        if (notifiableStudent.isPresent()) {
            notifiableStudentRepository.delete(notifiableStudent.get());
        }
    }

    public void notifyStudents(JobOpening jobOpening) {
        // Logic to notify students about the new job opening
        // This could involve sending emails or other forms of notifications
        System.out.println("Notifying students about the new job opening: " + jobOpening.getTitle());
        for (NotifiableStudent student : notifiableStudentRepository.findAll()) {
            System.out.println("Notifying student: " + student.getStudentEmail());
            // Here you would implement the actual notification logic, e.g., sending an email
        }
    }
}
