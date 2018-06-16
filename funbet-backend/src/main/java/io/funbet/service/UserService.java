package io.funbet.service;

import io.funbet.exception.ResourceNotFoundException;
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

    public UserEntity findUserById(Integer id) throws ResourceNotFoundException
    {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(""));
    }

    public UserEntity saveUser(UserEntity user)
    {
        return userRepository.save(user);
    }
}
