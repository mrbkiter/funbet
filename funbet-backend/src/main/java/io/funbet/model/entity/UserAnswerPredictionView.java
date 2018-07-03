package io.funbet.model.entity;

import io.funbet.type.IntArrayType;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "user_answer_prediction_view")
@Data
public class UserAnswerPredictionView
{
    @EmbeddedId
    UserAnswerId id;

    @Column(name = "team_ids")
    @Type(type = IntArrayType.TYPE_NAME)
    List<Integer> teamIds;

    @Column(name = "no_of_selected_teams")
    Integer noOfSelectedTeams;

    public UserAnswerPredictionView withId(UserAnswerId id)
    {
        this.id = id;
        return this;
    }

    @Embeddable
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserAnswerId implements Serializable
    {
        @Column(name = "tournament_prediction_id")
        Integer tournamentPredictionId;
        @Column(name = "user_id")
        Integer userId;
    }
}
