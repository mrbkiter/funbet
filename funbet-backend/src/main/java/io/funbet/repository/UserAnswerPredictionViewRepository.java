package io.funbet.repository;

import io.funbet.model.entity.TournamentPredictionTeamUserEntity;
import io.funbet.model.entity.UserAnswerPredictionView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Stream;

@Repository
public interface UserAnswerPredictionViewRepository extends ReadOnlyRepository<UserAnswerPredictionView,
        UserAnswerPredictionView.UserAnswerId> {

    @Query(value = "SELECT v FROM UserAnswerPredictionView v WHERE v.id.tournamentPredictionId = :id " +
            "AND v.noOfSelectedTeams = :no")
    Stream<UserAnswerPredictionView> findUserAnsweredSameNo(@Param("id") Integer tournamentPredictionId, @Param("no") Integer noOfSelected);
}