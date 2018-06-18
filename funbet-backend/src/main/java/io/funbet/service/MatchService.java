package io.funbet.service;

import io.funbet.exception.ResourceNotFoundException;
import io.funbet.exception.TimestampNotAllowedException;
import io.funbet.model.dto.ScoreRequest;
import io.funbet.model.entity.MatchEntity;
import io.funbet.model.entity.UserEntity;
import io.funbet.model.entity.UserMatchBetEntity;
import io.funbet.repository.MatchRepository;
import io.funbet.repository.UserMatchBetRepository;
import io.funbet.repository.UserMatchViewRepository;
import io.funbet.utils.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MatchService
{
    @Autowired
    MatchRepository matchRepository;

    @Autowired
    UserMatchBetRepository userMatchBetRepository;

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

    public UserMatchBetEntity betAMatch(Integer matchId, Integer teamId) throws ResourceNotFoundException, TimestampNotAllowedException
    {
        MatchEntity matchEntity = matchRepository.findById(matchId)
                .orElseThrow(() -> new ResourceNotFoundException("Match ID " + matchId + " not found"));
        if(matchEntity.getSystemStartTime().isBefore(LocalDateTime.now()))
        {
            throw new TimestampNotAllowedException("You can't bet this match because it has started");
        }

        UserEntity user = WebUtils.getLoggedInUser();
        UserMatchBetEntity.UserMatchBetId betId = new UserMatchBetEntity.UserMatchBetId(user.getId(), matchId);
        UserMatchBetEntity ett = new UserMatchBetEntity();
        ett.setId(betId);
        ett.setTeamId(teamId);
        userMatchBetRepository.save(ett);
        return ett;
    }
}
