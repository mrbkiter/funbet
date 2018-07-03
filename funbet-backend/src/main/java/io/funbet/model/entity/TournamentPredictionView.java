package io.funbet.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Entity
@Table(name = "tournament_prediction_view")
@Data
public class TournamentPredictionView {
    @Id
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

    @Column(name = "end_timestamp")
    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    LocalDateTime endTimestamp;

    @Column(name = "system_end_timestamp")
    LocalDateTime systemEndTimestamp;

    @Column(name = "team_ids")
    String teamIds;

    @Column(name = "team_names")
    String teamNames;

    @Transient
    List<Integer> selectedTeamIds;

    public List<Integer> getSelectedTeamIds()
    {
        String[] empty = {};
        selectedTeamIds =  Arrays.stream(
                Optional.ofNullable(StringUtils.split(teamIds, ","))
                .orElse(empty)
        ).map(s -> NumberUtils.toInt(s)).collect(Collectors.toList());
        return selectedTeamIds;
    }
}
