    package org.placement.placement.service;

    import org.placement.placement.entity.Student;
    import org.placement.placement.repository.StudentRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.util.Optional;

    @Service
    public class StudentService {

        @Autowired
        private StudentRepository studentRepository;

        // Save Student (Signup)
        public Student addStudent(Student student) {
            return studentRepository.save(student);
        }

        // Authenticate student by email and password
        public Student authenticateStudent(String email, String password) {
            return studentRepository.findByEmailAndPassword(email, password);
        }

        // Fetch student profile by ID
    
        public Student getStudentById(int id) {
            Optional<Student> student = studentRepository.findById(id);
            if (student.isPresent()) {
                System.out.println("Student found with ID: " + id);
                return student.get();
            } else {
                System.out.println("No student found with ID: " + id);
                return null;
            }
        }

        // Update student profile by ID
        public Student updateStudent(int id, Student studentDetails) {
            Optional<Student> studentOptional = studentRepository.findById(id);
            if (studentOptional.isPresent()) {
                Student student = studentOptional.get();
                student.setName(studentDetails.getName());
                student.setEmail(studentDetails.getEmail());
                student.setDept(studentDetails.getDept());
                student.setCgpa(studentDetails.getCgpa());
                student.setSkills(studentDetails.getSkills());
                student.setHSCMarks(studentDetails.getHSCMarks());
                student.setSSCMarks(studentDetails.getSSCMarks());
                student.setMajor(studentDetails.getMajor());
                student.setYearOfStudy(studentDetails.getYearOfStudy());
                return studentRepository.save(student);
            }
            return null;
        }

        
    }
