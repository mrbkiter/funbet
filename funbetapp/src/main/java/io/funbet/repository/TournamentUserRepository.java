package io.funbet.repository;

import io.funbet.model.entity.TournamentUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TournamentUserRepository
        extends JpaRepository<TournamentUserEntity, TournamentUserEntity.TournamentUserId>
{
}
