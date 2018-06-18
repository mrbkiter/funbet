package io.funbet.controller;

import io.funbet.model.entity.*;
import io.funbet.service.TournamentService;
import io.funbet.utils.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tournament")
public class TournamentController {
    @Autowired
    TournamentService tournamentService;

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
        return tournamentService.getMatches(id);
    }

    @GetMapping("/{id}/match/bet")
    public List<UserMatchView> getBetMatches(@PathVariable("id") Integer id)
    {
        UserEntity user = WebUtils.getLoggedInUser();
        return tournamentService.getBetMatches(id, user.getId());
    }

    @PostMapping("/{id}/match")
    public MatchView saveMatch(@PathVariable("id") Integer id, @Validated @RequestBody MatchEntity match)
    {
        match.setTournamentId(id);
        return tournamentService.saveMatch(match);
    }


}
