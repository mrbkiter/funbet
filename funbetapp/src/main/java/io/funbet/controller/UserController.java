package io.funbet.controller;


import io.funbet.model.entity.UserEntity;
import io.funbet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/user")
public class UserController
{
    @Autowired
    UserService userService;

    @GetMapping
    List<UserEntity> listAll()
    {
        return userService.listAll();
    }
}
