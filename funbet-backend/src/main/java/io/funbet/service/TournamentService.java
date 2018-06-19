package io.funbet.service;

import io.funbet.model.entity.*;
import io.funbet.repository.MatchRepository;
import io.funbet.repository.MatchViewRepository;
import io.funbet.repository.TournamentRepository;
import io.funbet.repository.UserMatchViewRepository;
import io.funbet.utils.TimezoneUtils;
import io.funbet.utils.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TournamentService
{
    @Autowired
    TournamentRepository tournamentRepository;

    @Autowired
    MatchRepository matchRepository;

    @Autowired
    MatchViewRepository matchViewRepository;

    @Autowired
    UserMatchViewRepository userMatchViewRepository;

    public List<TournamentEntity> getAll()
    {
        return tournamentRepository.findAll();
    }

    public TournamentEntity save(TournamentEntity tournamentEntity)
    {
        return tournamentRepository.save(tournamentEntity);
    }

    public List<UserMatchView> getBetMatches(Integer tournamentId, Integer userId)
    {
        return userMatchViewRepository.findByTournamentIdAndUserId(tournamentId, userId);
    }
    public List<MatchView> getMatches(Integer tournamentId)
    {
        return matchViewRepository.findByTournamentIdOrderByStartTimeAsc(tournamentId);
    }

    public MatchView saveMatch(MatchEntity match)
    {
        UserEntity userEntity = WebUtils.getLoggedInUser();
        String timezone = userEntity.getTimezone();
        match.setTimezone(timezone);
        match.setSystemStartTime(TimezoneUtils.convertLocalDateTimeToSystemTz(match.getStartTime(), timezone));
        MatchEntity matchEntity = matchRepository.save(match);
        return matchViewRepository.findById(matchEntity.getId()).orElse(new MatchView());
    }
}
