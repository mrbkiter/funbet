package io.funbet.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "tournament_team")
@Getter @Setter
public class TournamentTeamEntity
{
    @EmbeddedId
    TournamentTeamId tournamentTeamId;

    @Embeddable
    @Getter @Setter
    @AllArgsConstructor @NoArgsConstructor
    public static class TournamentTeamId implements Serializable
    {
        @Column(name = "team_id")
        Integer teamId;
        @Column(name = "tournament_id")
        Integer tournamentId;
    }
}
