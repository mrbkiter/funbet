package io.funbet.repository;

import io.funbet.model.entity.MatchView;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchViewRepository extends ReadOnlyRepository<MatchView, Integer>
{
    List<MatchView> findByTournamentIdOrderByStartTimeAsc(Integer tournamentId);
}
