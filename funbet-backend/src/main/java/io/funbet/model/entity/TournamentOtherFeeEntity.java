package io.funbet.model.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "tournament_other_fee")
@Data
public class TournamentOtherFeeEntity
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Integer id;

    @Column(name = "tournament_id")
    Integer tournamentId;

    @Column(name = "other_fee")
    int otherFee;

    @Column(name = "note")
    String note;
}
