package io.funbet.service;

import io.funbet.model.entity.TeamEntity;
import io.funbet.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService
{
    @Autowired
    TeamRepository teamRepository;

    public List<TeamEntity> listAll()
    {
        return teamRepository.findAll();
    }

    public TeamEntity saveTeam(TeamEntity team)
    {
        return teamRepository.save(team);
    }

    public void deleteTeam(Integer teamId)
    {
        teamRepository.deleteById(teamId);
    }
}
