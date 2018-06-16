package io.funbet.controller;

import io.funbet.model.entity.TournamentEntity;
import io.funbet.service.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tournament")
public class TournamentController
{
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
}
