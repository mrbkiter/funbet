package io.funbet.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import io.funbet.type.IntArrayType;
import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

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
    @Type(type = IntArrayType.TYPE_NAME)
    List<Integer> selectedTeamIds;

    @Column(name = "team_names")
    String teamNames;

}
