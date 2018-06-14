package io.funbet.service;

import io.funbet.model.entity.UserEntity;
import io.funbet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService
{
    @Autowired
    UserRepository userRepository;

    public List<UserEntity> listAll()
    {
        return userRepository.findAll();
    }
}
