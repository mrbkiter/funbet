package io.funbet.repository;

import io.funbet.model.entity.TeamEntity;
import io.funbet.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository
        extends JpaRepository<TeamEntity, Integer>
{
}
