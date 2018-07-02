package io.funbet.service;

import io.funbet.exception.InvalidDataException;
import io.funbet.exception.ResourceNotFoundException;
import io.funbet.exception.TimestampNotAllowedException;
import io.funbet.exception.UpdateNotAllowException;
import io.funbet.model.dto.TournamentOtherFeeRequest;
import io.funbet.model.dto.PredictionAnswerRequest;
import io.funbet.model.entity.*;
import io.funbet.repository.*;
import io.funbet.utils.TimezoneUtils;
import io.funbet.utils.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.Column;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.MissingResourceException;
import java.util.stream.Collectors;

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

    @Autowired
    UserMatchBetRepository userMatchBetRepository;

    @Autowired
    TournamentPredictionRepository tournamentPredictionRepository;

    @Autowired
    TournamentPredictionUserAnswerRepository userAnswerRepository;

    @Autowired
    TournamentUserBonusViewRepository tournamentUserBonusViewRepository;

    @Autowired
    TournamentOtherFeeRepository tournamentOtherFeeRepository;

    @Autowired
    TournamentPredictionAnswerRepository tournamentPredictionAnswerRepository;

    @Autowired
    TournamentUserOtherFeeRepository tournamentUserOtherFeeRepository;

    public List<TournamentEntity> getAll()
    {
        return tournamentRepository.findAll();
    }

    public TournamentEntity save(TournamentEntity tournamentEntity)
    {
        return tournamentRepository.save(tournamentEntity);
    }

    public List<UserMatchView> getRecentBetMatches(Integer tournamentId, Integer userId)
    {
        List<UserMatchView> matches = userMatchViewRepository
                .showRecentPastMatchesByTournamentIdAndUserId(tournamentId, userId, PageRequest.of(0, 4));
        Collections.reverse(matches);
        List<UserMatchView> futureMatches = userMatchViewRepository
                .showFutureMatchesByTournamentIdAndUserId(tournamentId, userId, PageRequest.of(0, 50));

        matches.addAll(futureMatches);

        return matches;
    }

    public List<UserMatchView> getBetMatches(Integer tournamentId, Integer userId)
    {
        return userMatchViewRepository.findByTournamentIdAndUserId(tournamentId, userId);
    }
    public List<MatchView> getMatches(Integer tournamentId)
    {
        return matchViewRepository.findByTournamentIdOrderByStartTimeAsc(tournamentId);
    }

    public MatchView saveMatch(MatchEntity match) throws UpdateNotAllowException {

        int noOfBetOnMatch = userMatchBetRepository.countNoOfBetOnByMatchId(match.getId());
        if(noOfBetOnMatch > 0)
            throw new UpdateNotAllowException("Users already placed bet on this match. " +
                    "You are no longer allowed to make any update on it");

        UserEntity userEntity = WebUtils.getLoggedInUser();
        String timezone = userEntity.getTimezone();
        match.setTimezone(timezone);
        match.setSystemStartTime(TimezoneUtils.convertLocalDateTimeToSystemTz(match.getStartTime(), timezone));
        MatchEntity matchEntity = matchRepository.save(match);
        return matchViewRepository.findById(matchEntity.getId()).orElse(new MatchView());
    }

    public List<TournamentPredictionEntity> getTournamentPredictionGames(Integer tournamentId)
    {
        return tournamentPredictionRepository.findAll();
    }

    public TournamentPredictionEntity save(TournamentPredictionEntity entity) throws TimestampNotAllowedException {
        Integer count = userAnswerRepository.countByTournamentPredictionId(entity.getId());
        if(count > 0)
            throw new TimestampNotAllowedException("Users already placed prediction on this game. You can't update it now");

        entity.setSystemEndTimestamp(
                TimezoneUtils.convertLocalDateTimeToSystemTz(entity.getEndTimestamp(),
                        WebUtils.getLoggedInUser().getTimezone()));

        return tournamentPredictionRepository.save(entity);
    }

    public void deletePrediction(Integer predictionId)
    {
        tournamentPredictionRepository.deleteById(predictionId);
    }

    @Transactional
    public List<TournamentPredictionTeamUserEntity> createUserPrediction( Integer userId, Integer predictionId, PredictionAnswerRequest request)
            throws TimestampNotAllowedException {
        TournamentPredictionEntity prediction =
                tournamentPredictionRepository.findById(predictionId).filter(v -> v.getSystemEndTimestamp()
                .isAfter(LocalDateTime.now())).orElseThrow(() -> new TimestampNotAllowedException("Prediction is closed"));

        List<TournamentPredictionTeamUserEntity> userPredictionEtts = request.getTeamIds().stream()
                .map(teamId -> new TournamentPredictionTeamUserEntity.TournamentPredictionTeamUserId(predictionId, teamId, userId))
                .map(id -> new TournamentPredictionTeamUserEntity().withId(id)).collect(Collectors.toList());
        userAnswerRepository.deleteByUserIdAndTournamentPredictionId(userId, predictionId);
        userAnswerRepository.saveAll(userPredictionEtts);
        return userPredictionEtts;
    }

    public List<TournamentPredictionTeamUserEntity> findUserPredictionByUserIdAndTournamentPredictionId( Integer userId, Integer predictionId)
    {
        return userAnswerRepository.findByUserIdAndTournamentPredictionId(userId, predictionId);
    }

    public List<TournamentUserBonusView> findUserPredictionByUserIdAndTournamentId(Integer userId, Integer tournamentId)
    {
        return tournamentUserBonusViewRepository.findByUserIdAndTournamentId(userId, tournamentId)
                .stream().filter(m -> m.getRole() != UserEntity.Role.ADMIN)
                .map(m -> {
                    if(m.getSystemEndTimestamp().isBefore(LocalDateTime.now()))
                        m.setEditable(false);
                    else
                        m.setEditable(true);
                    return m;
                })
                .collect(Collectors.toList())
                ;
    }

    public List<TournamentUserBonusView> findUserPredictionByPredictionId(Integer predictionId)
    {
        return tournamentUserBonusViewRepository.findBytournamentPredictionId(predictionId).stream()
                .filter(p -> p.getSystemEndTimestamp().isBefore(LocalDateTime.now())).collect(Collectors.toList());
    }

    public List<TournamentOtherFeeEntity> findTournamentOtherFeeByTournamentId(Integer tournamentId)
    {
        return tournamentOtherFeeRepository.findByTournamentIdOrderByIdAsc(tournamentId);
    }

    public TournamentOtherFeeEntity saveTournamentOtherFee(Integer tournamentId,
                                                           TournamentOtherFeeRequest request)
    {
        TournamentOtherFeeEntity ett = new TournamentOtherFeeEntity();
        ett.setOtherFee(request.getAmount());
        ett.setNote(request.getNote());
        ett.setTournamentId(tournamentId);
        return tournamentOtherFeeRepository.save(ett);
    }

    @Transactional
    public List<TournamentPredictionTeamAnswerEntity> writeAnswerForPreidction(final Integer predictionId, PredictionAnswerRequest request)
            throws ResourceNotFoundException, InvalidDataException {
        TournamentPredictionEntity predition = tournamentPredictionRepository.findById(predictionId).orElseThrow(() -> new ResourceNotFoundException("Prediction Id does not exist"));
        if(predition.getNoOfTeam() != request.getTeamIds().size())
            throw new InvalidDataException("Number of selected teams not equals to number of allowed teams for this prediction");

        List<Integer> teamIds = request.getTeamIds();
        List<TournamentPredictionTeamAnswerEntity> answers =
                teamIds.stream()
                        .map(teamId -> new TournamentPredictionTeamAnswerEntity.TournamentPredictionTeamAnswerId(predictionId, teamId))
                        .map(answerId -> new TournamentPredictionTeamAnswerEntity(answerId, LocalDateTime.now()))
                        .collect(Collectors.toList());
        //delete old one
        tournamentPredictionAnswerRepository.deleteAnswersByTournamentPredictionId(predictionId);

        //write new answer
        answers = tournamentPredictionAnswerRepository.saveAll(answers);

        //check who win / lose
        List<Integer> rightUsers = userAnswerRepository.findUserAnsweredCorrectly(predictionId, predition.getNoOfTeam(), request.getTeamIds());

        //now update bonus
        final String note = "Bonus for correctly predicting [" + predition.getName() + "]";
        List<TournamentUserOtherFeeEntity> bonuses = rightUsers.stream().map(userId -> {
            TournamentUserOtherFeeEntity ett = new TournamentUserOtherFeeEntity();
            ett.setUserId(userId);
            ett.setNote(note);
            ett.setBonus(predition.getBonusAmount());
            ett.setTournamentId(predition.getTournamentId());
            return ett;
        }).collect(Collectors.toList());
        //delete related bonus
        tournamentUserOtherFeeRepository.deleteByTournamentPredictionId(predictionId);
        //save bonuses
        tournamentUserOtherFeeRepository.saveAll(bonuses);

        return answers;
    }

}