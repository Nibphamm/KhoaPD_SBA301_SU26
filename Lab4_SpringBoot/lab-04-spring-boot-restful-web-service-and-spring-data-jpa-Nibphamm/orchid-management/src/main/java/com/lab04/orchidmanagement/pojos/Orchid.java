package com.lab04.orchidmanagement.pojos;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "Orchid")
public class Orchid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orchidId")
    private Integer orchidId;

    @NotBlank(message = "Orchid name must not be blank")
    @Column(name = "orchidName", nullable = false)
    private String orchidName;

    @NotNull(message = "isNatural must not be null")
    @Column(name = "isNatural", nullable = false)
    private Boolean isNatural;

    @Column(name = "orchidDescription")
    private String orchidDescription;

    @Column(name = "orchidCategory")
    private String orchidCategory;

    @Column(name = "isAttractive")
    private Boolean isAttractive;

    @Column(name = "orchidURL")
    private String orchidURL;

    public Orchid() {}

    public Orchid(String orchidName, Boolean isNatural, String orchidDescription,
                  String orchidCategory, Boolean isAttractive, String orchidURL) {
        this.orchidName = orchidName;
        this.isNatural = isNatural;
        this.orchidDescription = orchidDescription;
        this.orchidCategory = orchidCategory;
        this.isAttractive = isAttractive;
        this.orchidURL = orchidURL;
    }

    public Integer getOrchidId() { return orchidId; }
    public void setOrchidId(Integer orchidId) { this.orchidId = orchidId; }

    public String getOrchidName() { return orchidName; }
    public void setOrchidName(String orchidName) { this.orchidName = orchidName; }

    public Boolean getIsNatural() { return isNatural; }
    public void setIsNatural(Boolean isNatural) { this.isNatural = isNatural; }

    public String getOrchidDescription() { return orchidDescription; }
    public void setOrchidDescription(String orchidDescription) { this.orchidDescription = orchidDescription; }

    public String getOrchidCategory() { return orchidCategory; }
    public void setOrchidCategory(String orchidCategory) { this.orchidCategory = orchidCategory; }

    public Boolean getIsAttractive() { return isAttractive; }
    public void setIsAttractive(Boolean isAttractive) { this.isAttractive = isAttractive; }

    public String getOrchidURL() { return orchidURL; }
    public void setOrchidURL(String orchidURL) { this.orchidURL = orchidURL; }
}
