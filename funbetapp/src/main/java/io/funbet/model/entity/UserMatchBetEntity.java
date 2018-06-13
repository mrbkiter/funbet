package io.funbet.model.entity;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "user_match_bet")
@Getter @Setter
public class UserMatchBetEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "UUID")
    String id;

    @Column(name = "user_id")
    String userId;

    @Column(name = "match_id")
    @NonNull
    String matchId;

    @Column(name = "team_id")
    @NonNull
    String teamId;

    @Column(name = "bet_status")
    @Enumerated(EnumType.STRING)
    BetStatus betStatus;

    @Column(name = "last_updated_timestamp")
    LocalDateTime lastUpdatedTimestamp;

    enum BetStatus
    {
        WIN, LOSE, DRAW
    }
}
