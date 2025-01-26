package org.placement.placement.controller;

import java.util.List;

import org.placement.placement.entity.Application;
import org.placement.placement.entity.Company;
import org.placement.placement.entity.Student;
import org.placement.placement.request.LoginRequest;
import org.placement.placement.service.ApplicationService;
import org.placement.placement.service.CompanyService;
import org.placement.placement.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;


    @Autowired
    private CompanyService companyService;
    
    @Autowired
    private ApplicationService applicationService;
    


    // Login method to validate email and password
    @PostMapping("/login")
    public ResponseEntity<Student> login(@RequestBody LoginRequest loginRequest) {
        Student authenticatedStudent = studentService.authenticateStudent(loginRequest.getEmail(), loginRequest.getPassword());
        if (authenticatedStudent != null) {
            return ResponseEntity.ok(authenticatedStudent);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    // Signup method for creating a new student
    @PostMapping("/signup")
    public ResponseEntity<Student> signup(@RequestBody Student student) {
        Student newStudent = studentService.addStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(newStudent);
    }

    
   // Get student profile by ID
@GetMapping("/{id}")
public ResponseEntity<Student> getStudentById(@PathVariable int id) {
    Student student = studentService.getStudentById(id);
    if (student != null) {
        return ResponseEntity.ok(student);
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}


    // Update student profile by ID
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable int id, @RequestBody Student studentDetails) {
        Student updatedStudent = studentService.updateStudent(id, studentDetails);
        if (updatedStudent != null) {
            return ResponseEntity.ok(updatedStudent);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

       @GetMapping("/verifiedCompanies")
    public List<Company> getVerifiedCompanies() {
        return companyService.getVerifiedCompanies();
    }

   @PostMapping("/{studentId}/apply/{companyId}")
public ResponseEntity<String> applyForCompany(@PathVariable int studentId, @PathVariable int companyId) {
    if (!applicationService.hasApplied(studentId, companyId)) {
        Application application = new Application();
        application.setStudent(studentService.getStudentById(studentId));
        application.setCompany(companyService.getCompanyById(companyId));
        applicationService.applyForCompany(application);
        return ResponseEntity.ok("Applied successfully");
    } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already applied");
    }
}

// Check if a student has applied to a specific company
@GetMapping("/{studentId}/has-applied/{companyId}")
public ResponseEntity<Boolean> hasApplied(@PathVariable int studentId, @PathVariable int companyId) {
    boolean hasApplied = applicationService.hasApplied(studentId, companyId);
    return ResponseEntity.ok(hasApplied);
}



}
