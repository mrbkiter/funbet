package io.funbet.model.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
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
    @Column(name = "role")
    Role role;
    @Column(name = "email")
    @NotEmpty
    String email;

    @Column(name = "name")
    @NotEmpty
    String name;
    @Column(name = "lock")
    Boolean lock;

    @Column(name = "password")
    @NotEmpty
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;

    @Column(name = "last_update_timestamp")
    LocalDateTime lastUpdateTimestamp;

    public String getEmail() {
        return email.toLowerCase();
    }

    public enum Role
    {
        ADMIN,
        USER
    }
}
