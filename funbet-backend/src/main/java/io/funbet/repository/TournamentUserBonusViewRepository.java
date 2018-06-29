package io.funbet.repository;

import io.funbet.model.entity.TournamentUserBonusView;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TournamentUserBonusViewRepository extends ReadOnlyRepository<TournamentUserBonusView, Integer>
{
    @Query(value = "SELECT v FROM TournamentUserBonusView v WHERE (v.userId1 = :userId OR v.userId = :userId) AND v.tournamentId = :tournamentId")
    List<TournamentUserBonusView> findByUserIdAndTournamentId(@Param("userId") Integer userId, @Param("tournamentId") Integer tournamentId);

    List<TournamentUserBonusView> findBytournamentPredictionId(Integer tournamentPredictionId);
}
