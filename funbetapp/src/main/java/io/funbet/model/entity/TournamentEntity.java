package io.funbet.model.entity;

import javax.persistence.*;

@Table(name = "tournament")
@Entity
public class TournamentEntity
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    String id;

    @Column(name = "name")
    String name;

    @Column(name = "default_money_bet")
    Integer defaultMoneyBet;
}
