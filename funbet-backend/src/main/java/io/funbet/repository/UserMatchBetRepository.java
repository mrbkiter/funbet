package io.funbet.repository;

import io.funbet.model.entity.UserMatchBetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMatchBetRepository
        extends JpaRepository<UserMatchBetEntity, UserMatchBetEntity.UserMatchBetId>
{
    @Query(value = "SELECT um FROM UserMatchBetEntity um WHERE um.id.matchId = :matchId")
    List<UserMatchBetEntity> findByMatchId(@Param("matchId") Integer matchId);
}
