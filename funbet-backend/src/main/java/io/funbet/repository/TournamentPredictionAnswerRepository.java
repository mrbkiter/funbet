package io.funbet.repository;

import io.funbet.model.entity.TournamentPredictionTeamAnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TournamentPredictionAnswerRepository extends JpaRepository<TournamentPredictionTeamAnswerEntity,
        TournamentPredictionTeamAnswerEntity.TournamentPredictionTeamAnswerId> {
}
