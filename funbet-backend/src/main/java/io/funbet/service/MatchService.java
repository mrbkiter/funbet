package io.funbet.service;

import io.funbet.exception.ResourceNotFoundException;
import io.funbet.model.dto.ScoreRequest;
import io.funbet.model.entity.MatchEntity;
import io.funbet.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchService
{
    @Autowired
    MatchRepository matchRepository;

    public List<MatchEntity> listAll()
    {
        return matchRepository.findAll();
    }

    public MatchEntity saveMatch(MatchEntity match)
    {
        return matchRepository.save(match);
    }

    public void deleteMatch(Integer matchId)
    {
        matchRepository.deleteById(matchId);
    }

    public MatchEntity writeScore(Integer matchId, ScoreRequest scoreRequest) throws ResourceNotFoundException {
        MatchEntity matchEntity = matchRepository.findById(matchId)
                .orElseThrow(() -> new ResourceNotFoundException("Match ID " + matchId + " not found"));

        matchEntity.setScore1(scoreRequest.getScore1());
        matchEntity.setScore2(scoreRequest.getScore2());
        matchRepository.save(matchEntity);
        return matchEntity;
    }

}
