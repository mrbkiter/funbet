package io.funbet.controller;

import io.funbet.exception.ResourceNotFoundException;
import io.funbet.exception.TimestampNotAllowedException;
import io.funbet.model.Table;
import io.funbet.model.dto.ScoreRequest;
import io.funbet.model.dto.UserIdMatchIdRequest;
import io.funbet.model.entity.MatchEntity;
import io.funbet.model.entity.SummaryUserView;
import io.funbet.model.entity.UserMatchBetEntity;
import io.funbet.model.entity.UserMatchView;
import io.funbet.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * vu.nguyen
 */
@RestController
@RequestMapping("/match")
public class MatchController
{
    @Autowired
    MatchService matchService;

    @GetMapping
    public List<MatchEntity> listAll()
    {
        return matchService.listAll();
    }

    @PostMapping
    public MatchEntity addMatch(@Validated @RequestBody MatchEntity match)
    {
        return matchService.saveMatch(match);
    }

    @DeleteMapping("/{id}")
    public void deleteMatch(@PathVariable("id")  Integer matchId)
    {
        matchService.deleteMatch(matchId);
    }

    @PutMapping("/{id}/score")
    public void writeScore(@PathVariable("id") Integer matchId, @Validated @RequestBody ScoreRequest scoreRequest)
            throws ResourceNotFoundException
    {
        matchService.writeScore(matchId, scoreRequest);
    }

    @PutMapping("/{id}/team/{teamId}/bet")
    public UserMatchBetEntity betAMatch(@PathVariable("id") Integer matchId, @PathVariable("teamId") Integer teamId)
            throws ResourceNotFoundException, TimestampNotAllowedException
    {
        return matchService.betAMatch(matchId, teamId);
    }

    @GetMapping("/{id}/result")
    public List<UserMatchView> getMatchResult(@PathVariable("id") Integer matchId)
    {
        return matchService.getMatchResultTable(matchId);
    }

    @PostMapping("/tableboard")
    public Table tableBoardReport(@RequestBody UserIdMatchIdRequest request)
    {
        return matchService.getMatchResultTable2(request.getMatchIds(), request.getUserIds());
    }
}
