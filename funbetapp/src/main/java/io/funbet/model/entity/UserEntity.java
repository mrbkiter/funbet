package io.funbet.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;


@Entity
@Table(name = "user_account")
@Getter @Setter
public class UserEntity
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Integer id;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(name = "role")
    Role role;
    @Column(name = "email")
    String email;
    @Column(name = "name")
    String name;
    @Column(name = "lock")
    boolean lock;

    @Column(name = "last_update_timestamp")
    LocalDateTime lastUpdateTimestamp;

    public enum Role
    {
        ADMIN,
        SUPER_USER,
        USER
    }
}
