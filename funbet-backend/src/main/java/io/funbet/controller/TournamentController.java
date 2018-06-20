package io.funbet.controller;

import io.funbet.model.entity.*;
import io.funbet.service.FinanceService;
import io.funbet.service.TournamentService;
import io.funbet.utils.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tournament")
public class TournamentController {
    @Autowired
    TournamentService tournamentService;

    @Autowired
    FinanceService financeService;

    @GetMapping
    public List<TournamentEntity> tournaments()
    {
        return tournamentService.getAll();
    }

    @PostMapping
    public TournamentEntity saveTournament(@Validated @RequestBody TournamentEntity body)
    {
        return tournamentService.save(body);
    }

    @GetMapping("/{id}/match")
    public List<MatchView> getMatches(@PathVariable("id") Integer id)
    {
        List<MatchView> matches = tournamentService.getMatches(id);
        return matches.stream().map(m -> {
            if(m.getStartTime().isBefore(LocalDateTime.now()))
                m.setEditable(false);
            else
                m.setEditable(true);
            return m;
        }).collect(Collectors.toList());
    }

    @GetMapping("/{id}/match/bet")
    public List<UserMatchView> getBetMatches(@PathVariable("id") Integer id)
    {
        UserEntity user = WebUtils.getLoggedInUser();
        return tournamentService.getBetMatches(id, user.getId())
                .stream().map(m -> {
                    if(m.getStartTime().isBefore(LocalDateTime.now()))
                        m.setEditable(false);
                    else
                        m.setEditable(true);
                    return m;
                }).collect(Collectors.toList());
    }

    @PostMapping("/{id}/match")
    public MatchView saveMatch(@PathVariable("id") Integer id, @Validated @RequestBody MatchEntity match)
    {
        match.setTournamentId(id);
        return tournamentService.saveMatch(match);
    }

    @PostMapping("/{id}/finance/report")
    public FinanceService.FinanceTournamentReportResponse
    financeReport(@PathVariable("id") Integer tournamentId, @RequestBody List<Integer> userIds)
    {
        return financeService.buildFinanceTournamentReport(userIds);
    }

    @PutMapping("/{id}/finance/debt/clear")
    public void clearAllDebt(@PathVariable("id") Integer tournamentId, @RequestBody Integer[] userIds)
    {
        financeService.clearAllDebt(tournamentId, userIds);
    }


    @PutMapping("/{id}/finance/debt/user/{userId}/clear")
    public void clearAllDebtForUser(@PathVariable("id") Integer tournamentId, @PathVariable("userId") Integer userId)
    {
        financeService.clearAllDebt(tournamentId, userId);
    }

}
