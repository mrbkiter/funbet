package io.funbet.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
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
    Integer tournamentId;

    @Column(name = "name")
    @NotNull
    String name;

    @Column(name = "no_of_team")
    Integer noOfTeam;

    @Column(name = "bonus_amount")
    Integer bonusAmount;

    @Column(name = "last_update_timestamp")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    LocalDateTime lastUpdateTimestamp = LocalDateTime.now();

    @Column(name = "end_timestamp")
    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    LocalDateTime endTimestamp;

    @Column(name = "system_end_timestamp")
    LocalDateTime systemEndTimestamp;
}
