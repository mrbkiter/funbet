package io.funbet.model.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_match_bet")
@Getter @Setter
public class UserMatchBetEntity
{
    @EmbeddedId
    UserMatchBetId id;

    @Column(name = "team_id")
    @NonNull
    Integer teamId;

    @Column(name = "bet_status")
    @Enumerated(EnumType.STRING)
    BetStatus betStatus;

    @Column(name = "lose_money")
    Integer losedMoney;

    @Column(name = "last_updated_timestamp")
    LocalDateTime lastUpdatedTimestamp;

    enum BetStatus
    {
        WIN, LOSE, DRAW
    }

    @Embeddable
    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserMatchBetId implements Serializable
    {

        @Column(name = "user_id")
        Integer userId;

        @Column(name = "match_id")
        @NonNull
        Integer matchId;

    }
}
