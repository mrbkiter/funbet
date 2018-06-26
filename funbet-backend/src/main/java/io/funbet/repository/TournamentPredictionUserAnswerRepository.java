package io.funbet.repository;

import io.funbet.model.entity.TournamentPredictionTeamUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TournamentPredictionUserAnswerRepository extends JpaRepository<TournamentPredictionTeamUserEntity,
        TournamentPredictionTeamUserEntity.TournamentPredictionTeamUserId> {
}
