package io.funbet.repository;

import io.funbet.model.entity.SummaryUserView;
import io.funbet.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository
        extends JpaRepository<UserEntity, Integer>
{
    @Query(value = "SELECT u FROm UserEntity u WHERE u.role != 'ADMIN'")
    List<UserEntity> findExcludeAdmin();

    @Query(value = "SELECT u FROm UserEntity u WHERE u.role != 'ADMIN' " +
            "AND (u.lock = false OR u.lock IS NULL)")
    List<UserEntity> findExcludeAdminAndLockedUser();


    UserEntity findByEmail(String email);

    @Query("SELECT ua.id FROM UserEntity ua ORDER BY ua.id ASC")
    List<Integer> findOrderByIdAsc();

    @Query("SELECT new io.funbet.model.entity.SummaryUserView(ua.id, ua.email, ua.name) FROM UserEntity ua " +
            "WHERE ua.id IN (:ids) ORDER BY ua.id ASC")
    List<SummaryUserView> findUsersOrderbyIdASC(@Param("ids") List<Integer> ids);


}
