package org.placement.placement.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "TPO")
public class Tpo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String contactNo;
    private String email;
    private String password;
}
