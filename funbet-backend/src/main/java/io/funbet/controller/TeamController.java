package io.funbet.controller;

import io.funbet.model.entity.TeamEntity;
import io.funbet.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/team")
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
