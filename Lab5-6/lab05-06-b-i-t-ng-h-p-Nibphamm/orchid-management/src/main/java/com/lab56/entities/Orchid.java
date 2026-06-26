package com.lab56.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

@Entity
@Table(name = "Orchid")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Orchid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrchidID")
    private Integer orchidId;

    @Nationalized
    @Column(name = "OrchidName", nullable = false)
    private String orchidName;

    @Column(name = "isNatural")
    private Boolean isNatural;

    @Nationalized
    @Column(name = "orchidDescription", length = 500)
    private String orchidDescription;

    @Nationalized
    @Column(name = "orchidCategory")
    private String orchidCategory;

    @Column(name = "isAttractive")
    private Boolean isAttractive;

    @Column(name = "orchidURL")
    private String orchidURL;
}
