package io.funbet.repository;

import io.funbet.model.entity.FinanceOtherFeeReportView;
import io.funbet.model.entity.FinanceTournamentReportView;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FOFRRepository extends ReadOnlyRepository<FinanceOtherFeeReportView, Integer>
{
    @Query("SELECT f FROM FinanceOtherFeeReportView f WHERE f.userId IN (:userIds)")
    List<FinanceOtherFeeReportView> buildOtherFeeReport(@Param("userIds") List<Integer> userIds);
}
