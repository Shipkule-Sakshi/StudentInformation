package com.example.Studentinfo.repository;

import com.example.Studentinfo.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}

