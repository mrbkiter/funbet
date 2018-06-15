package io.funbet.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "team")
@Entity
@Getter @Setter
public class TeamEntity
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Integer id;

    @Column(name = "name")
    String name;
}


