package io.funbet.repository;

import io.funbet.model.entity.MatchView;
import io.funbet.model.entity.UserMatchView;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMatchViewRepository extends ReadOnlyRepository<UserMatchView, Integer>
{
    @Query(value = "SELECT um FROM UserMatchView um WHERE um.tournamentId = :tournamentId AND " +
            "(um.userId = :userId OR um.userId IS NULL) ORDER BY um.startTime ASC")
    List<UserMatchView> findByTournamentIdAndUserId(@Param("tournamentId") Integer tournamentId, @Param("userId") Integer userId);

    List<UserMatchView> findByMatchIdOrderByBetStatusAsc(Integer matchId);
}
