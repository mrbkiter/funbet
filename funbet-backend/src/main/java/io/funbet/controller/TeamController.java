package io.funbet.controller;

import io.funbet.model.entity.TeamEntity;
import io.funbet.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/team")
public class TeamController
{
    @Autowired
    TeamService teamService;

    @GetMapping
    public List<TeamEntity> listAll()
    {
        return teamService.listAll();
    }

    @PostMapping
    public TeamEntity saveTeam(@Validated @RequestBody TeamEntity team)
    {
        return teamService.saveTeam(team);
    }
}
