package io.funbet.repository;

import io.funbet.model.entity.TournamentUserEntity;
import io.funbet.model.entity.TournamentUserOtherFeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TournamentUserOtherFeeRepository
        extends JpaRepository<TournamentUserOtherFeeEntity, Integer>
{
    @Modifying
    @Query(value = "UPDATE TournamentUserOtherFeeEntity SET otherFeePaid = true " +
            "WHERE userId = :userId AND tournamentId = :tournamentId ")
    @Transactional
    void clearFeeForUser(@Param("tournamentId") Integer tournamentId, @Param("userId") Integer userId);

    @Modifying
    @Query(value = "UPDATE TournamentUserOtherFeeEntity SET bonusPaid = true " +
            "WHERE userId = :userId AND tournamentId = :tournamentId ")
    @Transactional
    void clearBonusForUser(@Param("tournamentId") Integer tournamentId, @Param("userId") Integer userId);

    void deleteByTournamentPredictionId(Integer tournamentPredictionId);
}
