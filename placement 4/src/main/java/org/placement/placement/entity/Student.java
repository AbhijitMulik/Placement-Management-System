package org.placement.placement.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String dept;
    private String email;
    private String password;
    private int yearOfStudy;
    private float cgpa;
    private String skills;
    private float HSCMarks;
    private float SSCMarks;
    private String major;
}
