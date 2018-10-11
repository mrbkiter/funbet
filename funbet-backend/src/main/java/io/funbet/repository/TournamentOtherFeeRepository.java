package io.funbet.repository;

import io.funbet.model.entity.TournamentOtherFeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TournamentOtherFeeRepository extends JpaRepository<TournamentOtherFeeEntity, Integer>
{
    List<TournamentOtherFeeEntity> findByTournamentIdOrderByIdAsc(Integer tournamentId);
}
