package io.funbet.repository;

import io.funbet.model.entity.MatchEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<MatchEntity, Integer>
{
}
