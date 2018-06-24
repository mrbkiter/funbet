package io.funbet.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "match")
@Getter @Setter
public class MatchEntity
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Integer id;

    @Column(name = "tournament_id")
    Integer tournamentId;

    @Column(name = "team_id_1")
    @NotNull
    Integer teamId1;

    @Column(name = "team_id_2")
    @NotNull
    Integer teamId2;

    @Column(name = "bet_score_1")
    //@NotNull
    BigDecimal betScore1;

    @Column(name = "bet_score_2")
    //@NotNull
    BigDecimal betScore2;

    @Column(name = "score_1")
    Integer score1;

    @Column(name = "score_2")
    Integer score2;

    @Column(name = "bet_money")
    Integer betMoney;

    @Column(name = "start_timestamp")
    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    LocalDateTime startTime;

    @Column(name = "system_start_timestamp")
    @JsonIgnore
    LocalDateTime systemStartTime;

    @Column(name = "timezone")
    String timezone;

}
