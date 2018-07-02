package io.funbet.repository;

import io.funbet.model.entity.TournamentPredictionTeamUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TournamentPredictionUserAnswerRepository extends JpaRepository<TournamentPredictionTeamUserEntity,
        TournamentPredictionTeamUserEntity.TournamentPredictionTeamUserId> {

    @Modifying
    @Query(value = "DELETE FROM TournamentPredictionTeamUserEntity  " +
            "WHERE id.userId = :userId AND id.tournamentPredictionId = :tournamentPredictionId ")
    @Transactional
    void deleteByUserIdAndTournamentPredictionId(@Param("userId") Integer userId, @Param("tournamentPredictionId") Integer tournamentPredictionId);

    @Query(value = "SELECT e FROM TournamentPredictionTeamUserEntity e " +
            "WHERE e.id.userId = :userId AND e.id.tournamentPredictionId = :tournamentPredictionId ")
    List<TournamentPredictionTeamUserEntity> findByUserIdAndTournamentPredictionId(@Param("userId") Integer userId, @Param("tournamentPredictionId") Integer tournamentPredictionId);

    @Query(value = "SELECT count(m) FROM TournamentPredictionTeamUserEntity m WHERE m.id.tournamentPredictionId = :id")
    int countByTournamentPredictionId(@Param("id") Integer tournamentPredictionId);

    @Query(value = "SELECT v.user_id FROM user_answer_prediction_view v WHERE v.tournament_prediction_id = :id " +
            "AND v.no_of_selected_teams = :no AND v.team_ids @> ARRAY[:teamIds]", nativeQuery = true)
    List<Integer> findUserAnsweredCorrectly(@Param("id") Integer tournamentPredictionId, @Param("no")  Integer noOfSelected, @Param("teamIds") List<Integer> teamIds);
}