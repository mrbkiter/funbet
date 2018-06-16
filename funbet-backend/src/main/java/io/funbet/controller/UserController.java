package io.funbet.controller;


import io.funbet.exception.ResourceNotFoundException;
import io.funbet.model.entity.UserEntity;
import io.funbet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController
{
    @Autowired
    UserService userService;

    @GetMapping
    List<UserEntity> listAll()
    {
        return userService.listAll();
    }

    @PostMapping
    UserEntity savePlayer(@Validated @RequestBody UserEntity user)
    {
        user.setRole(UserEntity.Role.USER);
        return userService.saveUser(user);
    }

    @GetMapping(value = "/{id}")
    UserEntity getUserById(@PathVariable("id") Integer id) throws ResourceNotFoundException
    {
        return userService.findUserById(id);
    }
}
