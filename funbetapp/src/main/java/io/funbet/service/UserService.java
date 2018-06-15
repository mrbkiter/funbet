package io.funbet.service;

import io.funbet.model.entity.UserEntity;
import io.funbet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
