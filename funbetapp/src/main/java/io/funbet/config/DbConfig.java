package io.funbet.config;

import io.funbet.repository.Repository;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackageClasses = Repository.class)
public class DbConfig
{
}
