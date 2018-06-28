package io.funbet.controller;

import io.funbet.exception.TimestampNotAllowedException;
import io.funbet.exception.UpdateNotAllowException;
import io.funbet.model.dto.OtherFeeRequestCreation;
import io.funbet.model.dto.UserPredictionRequest;
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
                    if(m.getSystemStartTime().isBefore(LocalDateTime.now()))
                        m.setEditable(false);
                    else
                        m.setEditable(true);
                    return m;
                }).collect(Collectors.toList());
    }

    @GetMapping("/{id}/match/recent/bet")
    public List<UserMatchView> getRecentBetMatches(@PathVariable("id") Integer id)
    {
        UserEntity user = WebUtils.getLoggedInUser();
        return tournamentService.getRecentBetMatches(id, user.getId())
                .stream().map(m -> {
                    if(m.getSystemStartTime().isBefore(LocalDateTime.now()))
                        m.setEditable(false);
                    else
                        m.setEditable(true);
                    return m;
                }).collect(Collectors.toList());
    }

    @PostMapping("/{id}/match")
    public MatchView saveMatch(@PathVariable("id") Integer id, @Validated @RequestBody MatchEntity match)
            throws UpdateNotAllowException
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


    @PostMapping("/{id}/finance/user/{userId}/fee")
    public void addFee(@PathVariable("id") Integer tournamentId, @PathVariable("userId") Integer userId,
                       @Validated @RequestBody OtherFeeRequestCreation feeRequestCreation)
    {
        financeService.addFee(tournamentId, userId, feeRequestCreation);
    }

    @PutMapping("/{id}/finance/user/{userId}/fee/clear")
    public void clearFee(@PathVariable("id") Integer tournamentId, @PathVariable("userId") Integer userId)
    {
        financeService.clearFee(tournamentId, userId);
    }

    @GetMapping("/{id}/prediction")
    public List<TournamentPredictionEntity> listAllPrediction(@PathVariable("id") Integer tournamentId)
    {
        return tournamentService.getTournamentPredictionGames(tournamentId);
    }

    @PostMapping("/{id}/prediction")
    public TournamentPredictionEntity createPrediction(@PathVariable("id") Integer tournamentId, @RequestBody @Validated TournamentPredictionEntity body)
    {
        body.setTournamentId(tournamentId);
        return tournamentService.save(body);
    }

    @PutMapping("/{id}/prediction/{predictionId}")
    public TournamentPredictionEntity updatePrediction(@PathVariable("id") Integer tournamentId, @PathVariable("predictionId") Integer predictionId,
                                                        @RequestBody @Validated TournamentPredictionEntity body)
    {
        body.setTournamentId(tournamentId);
        body.setId(predictionId);
        return tournamentService.save(body);
    }

    @DeleteMapping("/prediction/{predictionId}")
    public void deleteAPrediction(@PathVariable("predictionId") Integer predictionId)
    {
        tournamentService.deletePrediction(predictionId);
    }

    @PostMapping("/prediction/{predictionId}/user")
    public List<TournamentPredictionTeamUserEntity>
    createUserPrediction(@PathVariable("predictionId") Integer predictionId, @RequestBody @Validated UserPredictionRequest request) throws TimestampNotAllowedException {
        UserEntity user = WebUtils.getLoggedInUser();

        return tournamentService.createUserPrediction( user.getId(), predictionId,request);
    }

    @GetMapping("/prediction/{predictionId}/user")
    public List<TournamentPredictionTeamUserEntity> getUserPrediction(@PathVariable("predictionId") Integer predictionId)
            throws TimestampNotAllowedException
    {
        UserEntity user = WebUtils.getLoggedInUser();

        return tournamentService.findUserPredictionByUserIdAndTournamentPredictionId( user.getId(), predictionId);
    }

    @GetMapping("/{id}/prediction//user")
    public List<TournamentUserBonusView> findUserPrediction(@PathVariable("id") Integer tournamentId)
    {
        UserEntity user = WebUtils.getLoggedInUser();
        return tournamentService.findUserPredictionByUserIdAndTournamentId(user.getId(), tournamentId);
    }

    @GetMapping("/prediction/{predictionId}")
    public List<TournamentUserBonusView> findAll(@PathVariable("predictionId") Integer predictionId)
    {
        return tournamentService.findUserPredictionByPredictionId(predictionId);
    }
}
