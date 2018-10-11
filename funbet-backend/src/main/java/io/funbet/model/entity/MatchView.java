package io.funbet.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter @Setter
@Entity
@Table(name = "match_view")
public class MatchView
{
    @Id
    Integer id;

    @Column(name = "tournament_id")
    Integer tournamentId;

    @Column(name = "team_id_1")
    Integer teamId1;

    @Column(name = "team_id_2")
    Integer teamId2;

    @Column(name = "team_name_1")
    String teamName1;

    @Column(name = "team_name_2")
    String teamName2;

    @Column(name = "bet_score_1")
    BigDecimal betScore1;

    @Column(name = "bet_score_2")
    BigDecimal betScore2;

    @Column(name = "score_1")
    Integer score1;

    @Column(name = "score_2")
    Integer score2;

    @Column(name = "bet_money")
    Integer betMoney;

    @Column(name = "start_timestamp")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    LocalDateTime startTime;

    @Transient
    boolean editable = true;
}

