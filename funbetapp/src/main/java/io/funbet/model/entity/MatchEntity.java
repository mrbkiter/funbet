package io.funbet.model.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "macth_bet")
public class MatchEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "UUID")
    String id;

    @Column(name = "tournament_id")
    String tournamentId;

    @Column(name = "team_id_1")
    String teamId1;

    @Column(name = "team_id_2")
    String teamId2;

    @Column(name = "bet_score_1")
    Integer betScore1;

    @Column(name = "bet_score_2")
    Integer betScore2;

    @Column(name = "score_team_1")
    Integer score1;

    @Column(name = "score_team_2")
    Integer score2;

    @Column(name = "start_time")
    LocalDateTime startTime;

}
