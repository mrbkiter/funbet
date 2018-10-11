package io.funbet.repository;

import io.funbet.model.entity.TournamentPredictionEntity;
import io.funbet.model.entity.TournamentPredictionView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TournamentPredictionViewRepository extends ReadOnlyRepository<TournamentPredictionView, Integer>
{
    List<TournamentPredictionView> findByTournamentId(Integer tournamentId);
}
