package io.funbet.config;

import io.funbet.controller.Controller;
import io.funbet.security.JdbcAuthenticationProvider;
import io.funbet.service.Service;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(value = {DbConfig.class, SessionConfig.class, WebSecurityConfig.class})
@ComponentScan(basePackageClasses = {Controller.class, Service.class, JdbcAuthenticationProvider.class})
public class FunbetBoot
{
    public static void main(String[] args)
    {
        SpringApplication.run(FunbetBoot.class);
    }
}
