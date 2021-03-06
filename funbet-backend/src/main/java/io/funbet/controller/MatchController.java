package io.funbet.controller;

import io.funbet.exception.ResourceNotFoundException;
import io.funbet.exception.TimestampNotAllowedException;
import io.funbet.exception.UpdateNotAllowException;
import io.funbet.model.Table;
import io.funbet.model.dto.ScoreRequest;
import io.funbet.model.dto.UserIdMatchIdRequest;
import io.funbet.model.entity.MatchEntity;
import io.funbet.model.entity.UserMatchBetEntity;
import io.funbet.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            throws ResourceNotFoundException, TimestampNotAllowedException, UpdateNotAllowException
    {
        return matchService.betAMatch(matchId, teamId);
    }
}
