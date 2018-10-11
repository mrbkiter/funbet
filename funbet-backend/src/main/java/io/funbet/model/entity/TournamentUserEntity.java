package io.funbet.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "tournament_user")
@Getter @Setter
public class TournamentUserEntity
{
    @EmbeddedId
    TournamentUserId tournamentUserId;

    @Embeddable
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TournamentUserId implements Serializable
    {
        @Column(name = "user_id")
        Integer userId;
        @Column(name = "tournament_id")
        Integer tournamentId;
    }
}
