package io.funbet.repository;

import io.funbet.model.entity.MatchView;
import io.funbet.model.entity.UserMatchView;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMatchViewRepository extends PagingAndSortingRepository<UserMatchView, Integer>
{
    @Query(value = "SELECT um FROM UserMatchView um WHERE um.tournamentId = :tournamentId AND " +
            "(um.userId = :userId OR um.userId IS NULL) ORDER BY um.startTime ASC")
    List<UserMatchView> findByTournamentIdAndUserId(@Param("tournamentId") Integer tournamentId, @Param("userId") Integer userId);

    @Query(value = "SELECT um FROM UserMatchView um WHERE um.tournamentId = :tournamentId AND " +
            "(um.userId = :userId OR um.userId IS NULL) AND um.score1 IS NOT NULL " +
            " ORDER BY um.startTime DESC")
    List<UserMatchView> showRecentPastMatchesByTournamentIdAndUserId(@Param("tournamentId") Integer tournamentId,
                                                                     @Param("userId") Integer userId, Pageable p);

    @Query(value = "SELECT um FROM UserMatchView um WHERE um.tournamentId = :tournamentId AND " +
            "(um.userId = :userId OR um.userId IS NULL) AND um.score1 IS NULL " +
            " ORDER BY um.startTime ASC")
    List<UserMatchView> showFutureMatchesByTournamentIdAndUserId(@Param("tournamentId") Integer tournamentId,
                                                                     @Param("userId") Integer userId, Pageable p);

    List<UserMatchView> findRecentMatchByMatchIdOrderByBetStatusAsc(Integer matchId);

    @Query(value = "select um FROM UserMatchView um WHERE um.matchId IN (:matchIds) " +
            "AND um.userId IN (:userIds) ORDER BY um.matchId ASC, um.userId ASC")
    List<UserMatchView> findByMatchIdAndUserId(@Param("matchIds") List<Integer> matchIds,
                                                   @Param("userIds") List<Integer> userIds);
}
