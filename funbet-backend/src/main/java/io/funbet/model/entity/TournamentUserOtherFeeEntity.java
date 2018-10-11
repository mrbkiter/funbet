package io.funbet.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Table(name = "tournament_user_other_fee")
@Getter @Setter
public class TournamentUserOtherFeeEntity
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Integer id;

    @Column(name = "tournament_prediction_id")
    Integer tournamentPredictionId;

    @Column(name = "user_id")
    Integer userId;
    @Column(name = "tournament_id")
    Integer tournamentId;

    @Column(name = "other_fee")
    int otherFee;

    @Column(name = "bonus")
    int bonus;

    @Column(name = "note")
    String note;

    @Column(name = "other_fee_paid")
    Boolean otherFeePaid;

    @Column(name = "bonus_paid")
    Boolean bonusPaid;
}
