package io.funbet.service;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import io.funbet.exception.ResourceNotFoundException;
import io.funbet.exception.TimestampNotAllowedException;
import io.funbet.exception.UpdateNotAllowException;
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
public class MatchService {
    @Autowired
    MatchRepository matchRepository;

    @Autowired
    UserMatchBetRepository userMatchBetRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMatchViewRepository userMatchViewRepository;

    public List<MatchEntity> listAll() {
        return matchRepository.findAll();
    }

    public MatchEntity saveMatch(MatchEntity match) {
        return matchRepository.save(match);
    }

    public void deleteMatch(Integer matchId) {
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
                userRepository.findExcludeAdminAndLockedUser().stream()
                        .map(u -> u.getId()).filter(id -> !betUserIds.contains(id))
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
        if (score1To2.compareTo(equalPoint) > 0) {
            if (mb.getTeamId() == matchEntity.getTeamId1())
                mb.setBetStatus(UserMatchBetEntity.BetStatus.WIN);
            else
                mb.setBetStatus(UserMatchBetEntity.BetStatus.LOSE);
        }
        //team 1 losed the match
        else if (score1To2.compareTo(equalPoint) < 0) {
            if (mb.getTeamId() == matchEntity.getTeamId1())
                mb.setBetStatus(UserMatchBetEntity.BetStatus.LOSE);
            else
                mb.setBetStatus(UserMatchBetEntity.BetStatus.WIN);
        }
        //draw. no one won
        else {
            mb.setBetStatus(UserMatchBetEntity.BetStatus.DRAW);
        }
        return mb;
    }

    public UserMatchBetEntity betAMatch(Integer matchId, Integer teamId) throws
            ResourceNotFoundException, TimestampNotAllowedException, UpdateNotAllowException {
        MatchEntity matchEntity = matchRepository.findById(matchId)
                .orElseThrow(() -> new ResourceNotFoundException("Match ID " + matchId + " not found"));
        if (matchEntity.getSystemStartTime().isBefore(LocalDateTime.now())) {
            throw new TimestampNotAllowedException("You can't bet this match because it has started");
        }
        if (matchEntity.getBetScore1() == null || matchEntity.getBetScore2() == null)
            throw new UpdateNotAllowException("Match betting not input. Please wait for Admin to input it first");

        UserEntity user = WebUtils.getLoggedInUser();
        UserMatchBetEntity.UserMatchBetId betId = new UserMatchBetEntity.UserMatchBetId(user.getId(), matchId);
        UserMatchBetEntity ett = new UserMatchBetEntity();
        ett.setId(betId);
        ett.setTeamId(teamId);
        userMatchBetRepository.save(ett);
        return ett;
    }

    public Table getMatchResultTable(List<Integer> matchIds, List<Integer> userIds) {
        if (CollectionUtils.isEmpty(matchIds) || CollectionUtils.isEmpty(userIds))
            return new Table(0, 0);
        UserEntity loggedInUser = WebUtils.getLoggedInUser();
        Table table = new Table(userIds.size() + 1, matchIds.size());

        userIds.sort(Comparator.comparing(x -> x));
        Map<Integer, Integer> matchIndexMappings = new LinkedHashMap<>();
        Map<Integer, Integer> headerIndexMappings = new LinkedHashMap<>();
        IntStream.range(0, matchIds.size())
                .forEach(idx -> matchIndexMappings.put(matchIds.get(idx), idx));
        IntStream.range(0, userIds.size()).forEach(idx -> headerIndexMappings.put(userIds.get(idx), idx + 1));

        List<UserMatchView> matches = userMatchViewRepository.findByMatchIdAndUserId(matchIds, userIds);
        matches.stream().forEach(m -> {
            int rowIdx = matchIndexMappings.get(m.getMatchId());
            int verticalIdx = headerIndexMappings.get(m.getUserId());
            table.setElement
                    (rowIdx, verticalIdx, m);
            //set first element of each row.
            if (table.getRows()[rowIdx][0] == null) {
                table.setElement(rowIdx, 0, m);
            }
            UserMatchView firstEle = (UserMatchView) table.getRows()[rowIdx][0];
            //set no of selected on team
            if (m.getSelectedTeamId() != null && m.getSystemStartTime().isBefore(LocalDateTime.now())) {
                if (m.getSelectedTeamId() == m.getTeamId1())
                    firstEle.setFollower1(firstEle.getFollower1() + 1);
                else
                    firstEle.setFollower2(firstEle.getFollower2() + 1);
            }
            //censor the selection of future matches
            if(m.getSystemStartTime().isAfter(LocalDateTime.now())
                    && m.getSelectedTeamId() != null
                    && !loggedInUser.getId().equals(m.getUserId()))
            {
                m.setSelectedTeamId(0);
                m.setSelectedTeamName("CENSORED");
            }

        });
        //set first element of each row
 /*       IntStream.range(0, matchIds.size()).forEach(idx -> {
            table.setElement(idx, 0, table.getRows()[idx][1]);


        });
*/
        List userViews = userRepository.findUsersOrderbyIdASC(userIds);
        table.setHeaders(userViews);
        return table;
    }
}
