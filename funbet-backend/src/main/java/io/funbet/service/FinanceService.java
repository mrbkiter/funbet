package io.funbet.service;

import io.funbet.model.dto.OtherFeeRequestCreation;
import io.funbet.model.dto.UserFinanceReport;
import io.funbet.model.entity.FinanceOtherFeeReportView;
import io.funbet.model.entity.FinanceTournamentReportView;
import io.funbet.model.entity.TournamentUserOtherFeeEntity;
import io.funbet.repository.*;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @Autowired
    FOFRRepository fofrRepository;

    @Autowired
    TournamentUserOtherFeeRepository tournamentUserOtherFeeRepository;

    @Autowired
    TournamentOtherFeeRepository tournamentOtherFeeRepository;

    public FinanceTournamentReportResponse
        buildFinanceTournamentReport(Integer tournamentId, List<Integer> userId)
    {
        List<FinanceTournamentReportView> reports = ftrvRepository.buildTournamentReport(userId);


        Map<Integer, UserFinanceReport> userFinanceReportMap =
                reports.stream().collect(Collectors.toMap(x -> x.getUserId(), x -> {
                    UserFinanceReport converted = new UserFinanceReport();
                    converted.setName(x.getName());
                    converted.setEmail(x.getEmail());
                    converted.setUserId(x.getUserId());
                    converted.setRemainingDebt(x.getRemainingDebt());
                    converted.setContribution(x.getContribution());
                    return converted;
                }));

        List<FinanceOtherFeeReportView> otherFeeReports = fofrRepository.buildOtherFeeReport(userId);
        otherFeeReports.stream().forEach(x -> {
            UserFinanceReport converted = userFinanceReportMap.get(x.getUserId());
           converted.setOtherFeeContribution(x.getOtherFeeContribution());
           converted.setRemainingDebtOtherFee(x.getRemainingDebtOtherFee());
           converted.setPaidBonus(x.getPaidBonus());
           converted.setRemainingBonus(x.getRemainingBonus());
           if(x.getPaidBonus() != null)
               converted.setContribution(converted.getContribution() - x.getPaidBonus());
            if(x.getOtherFeeContribution() != null)
                converted.setContribution(converted.getContribution() + x.getOtherFeeContribution());
        });

        Collection<UserFinanceReport> totalReports = userFinanceReportMap.values();
        Long totalRemainingDebt = totalReports.stream()
                .map(r -> r.getRemainingDebt() + r.getRemainingDebtOtherFee())
                .reduce((x, y)-> x + y).get();
        Long totalContribution = totalReports.stream().map(r -> r.getContribution())
                .reduce((x, y)-> x + y).get();

        Integer otherFee = tournamentOtherFeeRepository.findByTournamentIdOrderByIdAsc(tournamentId)
            .stream().map(x -> x.getOtherFee()).reduce((x, y) -> x + y).orElse(0);

        totalContribution = totalContribution - otherFee;

        return FinanceTournamentReportResponse.builder().reports(totalReports)
                .totalContribution(totalContribution)
                .totalRemainingDebt(totalRemainingDebt).build();
    }

    public void clearAllDebt(Integer tournamentId, Integer... userIds)
    {
        userMatchBetRepository.clearDebtForUsers(tournamentId, Arrays.asList(userIds));
    }

    public void addFee(Integer tournamentId, Integer userId, OtherFeeRequestCreation requestCreation)
    {
        TournamentUserOtherFeeEntity ett  = new TournamentUserOtherFeeEntity();
        ett.setNote(requestCreation.getNote());
        ett.setOtherFee(requestCreation.getFee());
        ett.setTournamentId(tournamentId);
        ett.setUserId(userId);
        tournamentUserOtherFeeRepository.save(ett);
    }

    public void clearFee(Integer tournamentId, Integer userId)
    {
        tournamentUserOtherFeeRepository.clearFeeForUser(tournamentId, userId);
    }

    public void clearBonus(Integer tournamentId, Integer userId)
    {
        tournamentUserOtherFeeRepository.clearBonusForUser(tournamentId, userId);
    }

    public List<TournamentUserOtherFeeEntity> getFeeDetails(Integer tournamentId, Integer userId)
    {
        return tournamentUserOtherFeeRepository.findByTournamentIdAndUserIdAndOtherFeeGreaterThan(tournamentId, userId, 0);
    }

    public List<TournamentUserOtherFeeEntity> getBonusDetails(Integer tournamentId, Integer userId)
    {
        return tournamentUserOtherFeeRepository.findByTournamentIdAndUserIdAndBonusGreaterThan(tournamentId, userId, 0);
    }

    @Data
    @Builder
    public static class FinanceTournamentReportResponse
    {
        Collection<UserFinanceReport> reports;
        Long totalRemainingDebt;
        Long totalContribution;
    }
}
