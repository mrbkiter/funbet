package io.funbet.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "team")
@Getter @Setter
public class TeamEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "UUID")
    String id;

    @Column(name = "name")
    String name;
}
