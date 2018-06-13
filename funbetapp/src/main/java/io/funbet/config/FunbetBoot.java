package io.funbet.config;

import io.funbet.controller.Controller;
import io.funbet.service.Service;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(DbConfig.class)
@ComponentScan(basePackageClasses = {Controller.class, Service.class})
public class FunbetBoot
{
    public static void main(String[] args)
    {
        SpringApplication.run(FunbetBoot.class);
    }
}
