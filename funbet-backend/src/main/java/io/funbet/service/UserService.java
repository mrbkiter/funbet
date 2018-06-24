package io.funbet.service;

import io.funbet.exception.ResourceNotFoundException;
import io.funbet.model.dto.UserLockRequest;
import io.funbet.model.entity.UserEntity;
import io.funbet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class UserService
{
    @Autowired
    UserRepository userRepository;

    public List<UserEntity> listAllExcludeAdmin()
    {
        return userRepository.findExcludeAdmin();
    }

    public UserEntity findUserById(Integer id) throws ResourceNotFoundException
    {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(""));
    }

    public UserEntity saveUser(UserEntity user) throws ResourceNotFoundException {
        return userRepository.save(user);
    }

    public void deleteUser(Integer userId)
    {
        userRepository.deleteById(userId);
    }

    public void updateUserLock(Integer userId, UserLockRequest request) throws ResourceNotFoundException {
        UserEntity user = findUserById(userId);
        user.setLock(request.getLock());
        userRepository.save(user);
    }


}
