package io.funbet.service;

import io.funbet.model.entity.TournamentEntity;
import io.funbet.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TournamentService
{
    @Autowired
    TournamentRepository tournamentRepository;

    public List<TournamentEntity> getAll()
    {
        return tournamentRepository.findAll();
    }

    public TournamentEntity save(TournamentEntity tournamentEntity)
    {
        return tournamentRepository.save(tournamentEntity);
    }
}
