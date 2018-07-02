package io.funbet.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "tournament_prediction_team_answer")
@AllArgsConstructor
@NoArgsConstructor
public class TournamentPredictionTeamAnswerEntity
{
    @EmbeddedId
    TournamentPredictionTeamAnswerId id;

    @Column(name = "last_update_timestamp")
    LocalDateTime lastUpdateTimestamp = LocalDateTime.now();

    @Embeddable
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TournamentPredictionTeamAnswerId implements Serializable
    {
        @Column(name = "tournament_prediction_id")
        Integer tournamentPredictionId;
        @Column(name = "team_id")
        Integer teamId;
    }
}
