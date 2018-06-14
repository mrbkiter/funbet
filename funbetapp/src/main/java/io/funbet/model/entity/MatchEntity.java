package io.funbet.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "match")
@Getter @Setter
public class MatchEntity
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    String id;

    @Column(name = "tournament_id")
    Integer tournamentId;

    @Column(name = "team_id_1")
    Integer teamId1;

    @Column(name = "team_id_2")
    Integer teamId2;

    @Column(name = "bet_score_1")
    Float betScore1;

    @Column(name = "bet_score_2")
    Float betScore2;

    @Column(name = "score_team_1")
    Integer score1;

    @Column(name = "score_team_2")
    Integer score2;

    @Column(name = "start_time")
    LocalDateTime startTime;

}
