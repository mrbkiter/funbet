package io.funbet.repository;

import io.funbet.model.entity.FinanceTournamentReportView;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FTRVRepository extends ReadOnlyRepository<FinanceTournamentReportView, Integer>
{
    @Query("SELECT f FROM FinanceTournamentReportView f WHERE f.userId IN (:userIds)")
    List<FinanceTournamentReportView> buildTournamentReport(@Param("userIds") List<Integer> userIds);
}
