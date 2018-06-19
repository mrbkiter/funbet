package io.funbet.service;

import io.funbet.model.entity.FinanceTournamentReportView;
import io.funbet.repository.FTRVRepository;
import io.funbet.repository.UserMatchBetRepository;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

/**
 * vu.nguyen
 */
@Service
public class FinanceService
{
    @Autowired
    UserMatchBetRepository userMatchBetRepository;

    @Autowired
    FTRVRepository ftrvRepository;

    public FinanceTournamentReportResponse buildFinanceTournamentReport(List<Integer> userId)
    {
        List<FinanceTournamentReportView> reports = ftrvRepository.buildTournamentReport(userId);

        Long totalRemainingDebt = reports.stream().map(r -> r.getRemainingDebt())
                .reduce((x, y)-> x + y).get();
        Long totalContribution = reports.stream().map(r -> r.getContribution())
                .reduce((x, y)-> x + y).get();
        return FinanceTournamentReportResponse.builder().reports(reports)
                .totalContribution(totalContribution)
                .totalRemainingDebt(totalRemainingDebt).build();
    }

    public void clearAllDebt(Integer tournamentId, Integer... userIds)
    {
        userMatchBetRepository.clearDebtForUsers(tournamentId, Arrays.asList(userIds));
    }

    @Data
    @Builder
    public static class FinanceTournamentReportResponse
    {
        List<FinanceTournamentReportView> reports;
        Long totalRemainingDebt;
        Long totalContribution;
    }
}
