package org.placement.placement.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "pc")
public class PlacementCoordinator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String dept;
    private String email;
    private String password;
    private String contactNo;
}
