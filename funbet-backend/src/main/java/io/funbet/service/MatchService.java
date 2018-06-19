package io.funbet.service;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import io.funbet.exception.ResourceNotFoundException;
import io.funbet.exception.TimestampNotAllowedException;
import io.funbet.model.Table;
import io.funbet.model.dto.ScoreRequest;
import io.funbet.model.entity.*;
import io.funbet.repository.MatchRepository;
import io.funbet.repository.UserMatchBetRepository;
import io.funbet.repository.UserMatchViewRepository;
import io.funbet.repository.UserRepository;
import io.funbet.utils.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class MatchService
{
    @Autowired
    MatchRepository matchRepository;

    @Autowired
    UserMatchBetRepository userMatchBetRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMatchViewRepository userMatchViewRepository;

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
        BigDecimal score1 = new BigDecimal(matchEntity.getScore1());
        BigDecimal score2 = new BigDecimal(matchEntity.getScore2());
        BigDecimal score1To2 = matchEntity.getBetScore1().add(score1)
                                .subtract(matchEntity.getBetScore2()).subtract(score2);

        BigDecimal equalPoint = new BigDecimal(0);
        //update betting result of player
        List<UserMatchBetEntity> matchBettings = userMatchBetRepository.findByMatchId(matchId);
        matchBettings.stream().forEach(mb -> calculateBetting(matchEntity, score1To2, equalPoint, mb));
        Set<Integer> betUserIds = matchBettings.stream().map(mb -> mb.getId().getUserId()).collect(Collectors.toSet());


        //for all players who haven't bet yet. They would become losers
        List<UserMatchBetEntity> userMatchNotBet =
                userRepository.findAll().stream().map(u -> u.getId()).filter(id -> !betUserIds.contains(id))
                .map(id -> {
                    UserMatchBetEntity ett = new UserMatchBetEntity();
                    ett.setId(new UserMatchBetEntity.UserMatchBetId(id, matchId));
                    ett.setBetStatus(UserMatchBetEntity.BetStatus.LOSE);
                    return ett;
                }).collect(Collectors.toList());
        matchBettings.addAll(userMatchNotBet);
        userMatchBetRepository.saveAll(matchBettings);
        return matchEntity;
    }

    private UserMatchBetEntity calculateBetting(MatchEntity matchEntity, BigDecimal score1To2, BigDecimal equalPoint, UserMatchBetEntity mb) {
        if(score1To2.compareTo(equalPoint) > 0)
        {
            if(mb.getTeamId() == matchEntity.getTeamId1())
                mb.setBetStatus(UserMatchBetEntity.BetStatus.WIN);
            else
                mb.setBetStatus(UserMatchBetEntity.BetStatus.LOSE);
        }
        //team 1 losed the match
        else if(score1To2.compareTo(equalPoint) < 0)
        {
            if(mb.getTeamId() == matchEntity.getTeamId1())
                mb.setBetStatus(UserMatchBetEntity.BetStatus.LOSE);
            else
                mb.setBetStatus(UserMatchBetEntity.BetStatus.WIN);
        }
        //draw. no one won
        else
        {
            mb.setBetStatus(UserMatchBetEntity.BetStatus.DRAW);
        }
        return mb;
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

    public List<UserMatchView> getMatchResultTable(Integer matchId)
    {
        return userMatchViewRepository.findByMatchIdOrderByBetStatusAsc(matchId);
    }

    public Collection<List<UserMatchView>> getMatchResultTable(List<Integer> matchIds, List<Integer> userIds)
    {
        Map<Integer, List<UserMatchView>> tableBoard = Maps.newHashMap();
        if(CollectionUtils.isEmpty(matchIds) || CollectionUtils.isEmpty(userIds))
            return Lists.newArrayList();


        List<UserMatchView> matches = userMatchViewRepository.findByMatchIdAndUserId(matchIds, userIds);
        matches.stream().forEach(m -> {
            List<UserMatchView> row = tableBoard.getOrDefault(m.getMatchId(), Lists.newArrayList());
            row.add(m);
            tableBoard.put(m.getMatchId(), row);
        });


        return tableBoard.values();
    }

    public Table<SummaryUserView, UserMatchView> getMatchResultTable2(List<Integer> matchIds, List<Integer> userIds)
    {
        if(CollectionUtils.isEmpty(matchIds) || CollectionUtils.isEmpty(userIds))
            return new Table<>(0, 0);

        Table<SummaryUserView, UserMatchView> table = new Table<>(userIds.size(), matchIds.size());

        Map<Integer, Integer> matchIndexMappings = new HashMap<>();
        Map<Integer, Integer> headerIndexMappings = new HashMap<>();
        IntStream.range(0, matchIds.size())
                .forEach(idx -> matchIndexMappings.put(matchIds.get(idx), idx));
        IntStream.range(0, userIds.size()).forEach(idx -> headerIndexMappings.put(userIds.get(idx), idx));

        List<UserMatchView> matches = userMatchViewRepository.findByMatchIdAndUserId(matchIds, userIds);
        matches.stream().forEach(m -> {
            table.setElement(matchIndexMappings.get(m.getMatchId()), headerIndexMappings.get(m.getUserId()), m);
        });

        List<SummaryUserView> userViews = userRepository.findUsers(userIds);
        table.setHeaders(userViews);
        return table;
    }
}
