package io.funbet.config;

import io.funbet.model.entity.UserEntity;
import io.funbet.repository.Repository;
import io.funbet.type.UserType;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackageClasses = Repository.class)
@EntityScan(basePackageClasses = {UserEntity.class, UserType.class})
public class DbConfig
{
}
