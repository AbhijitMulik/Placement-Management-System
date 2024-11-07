package org.placement.placement.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Date;

@Entity
@Data
@Table(name = "company")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String companyType;
    private String contactPerson;
    private String email;
    private String password;
    private int noOfVacancies;
    private float criteriaCgpa;
    private Date interviewDate;
    private boolean verified; 
}
