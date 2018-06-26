package io.funbet.model.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "tournament_prediction")
@Data
public class TournamentPredictionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "tournament_id")
    @NotNull
    Integer tournamentId;

    @Column(name = "name")
    @NotNull
    Integer name;

    @Column(name = "no_of_team")
    Integer noOfTeam;

    @Column(name = "bonus_amount")
    Integer bonusAmount;

    @Column(name = "last_update_timestamp")
    LocalDateTime lastUpdateTimestamp = LocalDateTime.now();

    @Column(name = "end_timestamp")
    @NotNull
    LocalDateTime endTimestamp;

    @Column(name = "system_end_timestamp")
    LocalDateTime systemEndTimestamp;
}
