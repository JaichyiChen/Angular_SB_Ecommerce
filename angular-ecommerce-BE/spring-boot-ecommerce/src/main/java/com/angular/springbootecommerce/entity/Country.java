package com.angular.springbootecommerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="country")
@Getter
@Setter
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="code")
    private String code;

    @Column(name="name")
    private String Name;

    //Setup one-to-many with states
    @OneToMany(mappedBy = "country")
    @JsonIgnore // This annotation tells Jackson to ignore this field during serialization
    private List<State> states;
}
