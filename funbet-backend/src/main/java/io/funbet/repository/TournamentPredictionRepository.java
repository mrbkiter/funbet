package io.funbet.repository;

import io.funbet.model.entity.TournamentPredictionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TournamentPredictionRepository extends JpaRepository<TournamentPredictionEntity, Integer> {
}
