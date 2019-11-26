package io.funbet.controller;


import io.funbet.exception.ResourceNotFoundException;
import io.funbet.model.dto.UserLockRequest;
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
    UserEntity savePlayer(@Validated @RequestBody UserEntity user) throws ResourceNotFoundException {
        user.setRole(UserEntity.Role.USER);
        if(user.getId() != null)
        {
            UserEntity oldValue = userService.findUserById(user.getId());
            if(!user.getEmail().equalsIgnoreCase(oldValue.getEmail())) {
                throw new IllegalStateException("useraccount is not allowed to change");
            }
            oldValue.setEmail(user.getEmail());
            oldValue.setName(user.getName());
            oldValue.setPassword(user.getPassword());

            user = oldValue;
        }

        return userService.saveUser(user);
    }

    @GetMapping(value = "/{id}")
    UserEntity getUserById(@PathVariable("id") Integer id) throws ResourceNotFoundException
    {
        return userService.findUserById(id);
    }


    @RequestMapping(value = "/loggedInUser", method={ RequestMethod.GET,
            RequestMethod.OPTIONS })
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

    @DeleteMapping("/{id}")
    void deleteUser(@PathVariable("id") Integer userId)
    {
        userService.deleteUser(userId);
    }

    @PutMapping("/{id}/lock")
    void updateLock(@PathVariable("id") Integer userId, @RequestBody UserLockRequest request)
            throws ResourceNotFoundException
    {
        userService.updateUserLock(userId, request);
    }
}
