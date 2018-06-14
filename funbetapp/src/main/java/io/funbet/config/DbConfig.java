package io.funbet.config;

import io.funbet.model.entity.UserEntity;
import io.funbet.repository.Repository;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackageClasses = Repository.class)
@ComponentScan(basePackageClasses = UserEntity.class)
public class DbConfig
{
}
