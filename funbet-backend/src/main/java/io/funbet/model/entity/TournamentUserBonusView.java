package io.funbet.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import lombok.Data;
import org.springframework.util.StringUtils;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "tournament_user_bonus_view")
@Data
public class TournamentUserBonusView {
    @Id
    Integer id;

    @Column(name = "tournament_id")
    Integer tournamentId;
    @Column(name = "name")
    String name;
    @Column(name = "tournament_prediction_id")
    Integer tournamentPredictionId;
    @Column(name = "user_id")
    Integer userId;
    @Column(name = "user_id1")
    Integer userId1;
    @Column(name = "user_name")
    String userName;
    @Column(name = "teams")
    String teams;
    @Column(name = "no_of_team")
    int noOfTeam;
    @Column(name = "end_timestamp")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    LocalDateTime endTimestamp;
    @Column(name = "system_end_timestamp")
    LocalDateTime systemEndTimestamp;

    @Column(name = "bonus_amount")
    Integer bonusAmount;

    @Column(name = "team_ids")
    String teamIds;

    public List<String> getSelectedTeamIds() {

        return teamIds == null ? new ArrayList<>() : Arrays.asList(teamIds.split(","));
    }
}