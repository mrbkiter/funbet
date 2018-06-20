package io.funbet.controller;


import io.funbet.exception.ResourceNotFoundException;
import io.funbet.model.dto.UserUpdateRequest;
import io.funbet.model.entity.UserEntity;
import io.funbet.service.UserService;
import io.funbet.utils.WebUtils;
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
        return userService.listAllExcludeAdmin();
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

    @GetMapping(value = "/loggedInUser")
    UserEntity user()
    {
        return WebUtils.getLoggedInUser();
    }

    @PutMapping("/loggingUser")
    void updateLoggingUser(@Validated @RequestBody UserUpdateRequest request) throws ResourceNotFoundException {
        UserEntity user = WebUtils.getLoggedInUser();

        user = userService.findUserById(user.getId());
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        userService.saveUser(user);
    }
}
