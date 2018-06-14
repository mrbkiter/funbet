package io.funbet.repository;

import io.funbet.model.entity.TournamentTeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TournamentTeamRepository
        extends JpaRepository<TournamentTeamEntity, TournamentTeamEntity.TournamentTeamId>
{
}
