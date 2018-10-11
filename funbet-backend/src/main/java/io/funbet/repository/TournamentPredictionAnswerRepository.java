package io.funbet.repository;

import io.funbet.model.entity.TournamentPredictionTeamAnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TournamentPredictionAnswerRepository extends JpaRepository<TournamentPredictionTeamAnswerEntity,
        TournamentPredictionTeamAnswerEntity.TournamentPredictionTeamAnswerId> {

    @Modifying
    @Query(value = "DELETE FROM TournamentPredictionTeamAnswerEntity  " +
            "WHERE id.tournamentPredictionId = :tournamentPredictionId ")
    @Transactional
    void deleteAnswersByTournamentPredictionId(@Param("tournamentPredictionId") Integer tournamentPredictionId);

}
