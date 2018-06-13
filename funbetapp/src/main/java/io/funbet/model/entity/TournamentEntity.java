package io.funbet.model.entity;

import javax.persistence.*;

@Entity(name = "tournament")
public class TournamentEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "UUID")
    String id;

    @Column(name = "name")
    String name;
}
