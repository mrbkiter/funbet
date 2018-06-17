package io.funbet.model.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Table(name = "tournament")
@Entity
@Getter @Setter
public class TournamentEntity
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    String id;

    @Column(name = "name")
    @NotEmpty
    String name;

    @Column(name = "default_money_bet")
    Integer defaultMoneyBet;
}
