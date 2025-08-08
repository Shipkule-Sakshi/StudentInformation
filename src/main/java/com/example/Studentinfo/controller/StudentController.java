package com.example.Studentinfo.controller;

import com.example.Studentinfo.entity.Student;
import com.example.Studentinfo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService service;

    // Folder where files will be saved
    private final Path uploadDir = Paths.get("uploads");

    @Autowired
    public StudentController(StudentService service) {
        this.service = service;
        try {
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory!", e);
        }
    }

    // GET all students
    @GetMapping
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }

    // POST create new student with multipart/form-data
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Student saveStudent(
            @RequestPart("name") String name,
            @RequestPart("mobileno") String mobileno,
            @RequestPart(value = "fathersName", required = false) String fathersName,
            @RequestPart(value = "mothersName", required = false) String mothersName,
            @RequestPart(value = "course", required = false) String course,
            @RequestPart(value = "gender", required = false) String gender,
            @RequestPart(value = "branch", required = false) String branch,
            @RequestPart(value = "email", required = false) String email,
            @RequestPart(value = "dob", required = false) String dob,
            @RequestPart(value = "address", required = false) String address,
            @RequestPart(value = "photo", required = false) MultipartFile photoFile
    ) {
        Student student = new Student();
        student.setName(name);
        student.setMobileno(mobileno);
        student.setFathersName(fathersName);
        student.setMothersName(mothersName);
        student.setCourse(course);
        student.setGender(gender);
        student.setBranch(branch);
        student.setEmail(email);
        student.setDob(dob);
        student.setAddress(address);

        if (photoFile != null && !photoFile.isEmpty()) {
            String filename = storeFile(photoFile);
            student.setPhoto(filename);
        }

        return service.saveStudent(student);
    }

    // GET student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return service.getStudentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE student by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        service.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    // PUT update student by ID with multipart/form-data
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @RequestPart("name") String name,
            @RequestPart("mobileno") String mobileno,
            @RequestPart(value = "fathersName", required = false) String fathersName,
            @RequestPart(value = "mothersName", required = false) String mothersName,
            @RequestPart(value = "course", required = false) String course,
            @RequestPart(value = "gender", required = false) String gender,
            @RequestPart(value = "branch", required = false) String branch,
            @RequestPart(value = "email", required = false) String email,
            @RequestPart(value = "dob", required = false) String dob,
            @RequestPart(value = "address", required = false) String address,
            @RequestPart(value = "photo", required = false) MultipartFile photoFile
    ) {
        return service.getStudentById(id)
                .map(existingStudent -> {
                    existingStudent.setName(name);
                    existingStudent.setMobileno(mobileno);
                    existingStudent.setFathersName(fathersName);
                    existingStudent.setMothersName(mothersName);
                    existingStudent.setCourse(course);
                    existingStudent.setGender(gender);
                    existingStudent.setBranch(branch);
                    existingStudent.setEmail(email);
                    existingStudent.setDob(dob);
                    existingStudent.setAddress(address);

                    if (photoFile != null && !photoFile.isEmpty()) {
                        String filename = storeFile(photoFile);
                        existingStudent.setPhoto(filename);
                    }

                    Student updated = service.saveStudent(existingStudent);
                    return ResponseEntity.ok(updated);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Method to save uploaded file on disk and return filename
    private String storeFile(MultipartFile file) {
        try {
            String originalFilename = file.getOriginalFilename();

            // Optional: generate a unique filename to avoid collisions
            String filename = System.currentTimeMillis() + "_" + originalFilename;

            Path targetLocation = uploadDir.resolve(filename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file " + file.getOriginalFilename(), e);
        }
    }
}
