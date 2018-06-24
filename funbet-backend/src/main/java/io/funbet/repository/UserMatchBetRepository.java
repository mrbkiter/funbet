package io.funbet.repository;

import io.funbet.model.entity.UserMatchBetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserMatchBetRepository
        extends JpaRepository<UserMatchBetEntity, UserMatchBetEntity.UserMatchBetId>
{
    @Query(value = "SELECT um FROM UserMatchBetEntity um WHERE um.id.matchId = :matchId")
    List<UserMatchBetEntity> findByMatchId(@Param("matchId") Integer matchId);

    @Modifying
    @Query(value = "UPDATE user_match_bet AS um SET paid = true FROM match AS m " +
            "WHERE um.user_id IN (:userIds) AND um.bet_status = 'LOSE' AND m.tournament_id = :tournamentId " +
            "AND m.id = um.match_id", nativeQuery = true)
    @Transactional
    void clearDebtForUsers(@Param("tournamentId") Integer tournamentId, @Param("userIds") List<Integer> userIds);

    @Query(value = "SELECT count(um) FROM UserMatchBetEntity um WHERE um.id.matchId = :matchId")
    int countNoOfBetOnByMatchId(@Param("matchId") Integer matchId);
}

