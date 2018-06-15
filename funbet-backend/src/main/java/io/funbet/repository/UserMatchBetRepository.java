package io.funbet.repository;

import io.funbet.model.entity.UserMatchBetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMatchBetRepository
        extends JpaRepository<UserMatchBetEntity, UserMatchBetEntity.UserMatchBetId>
{
}
