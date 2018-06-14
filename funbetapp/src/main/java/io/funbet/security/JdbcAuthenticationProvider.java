package io.funbet.security;

import io.funbet.model.entity.UserEntity;
import io.funbet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class JdbcAuthenticationProvider
        implements AuthenticationProvider {

    @Autowired
    UserRepository userRepository;

    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {

        String email = authentication.getName();
        String password = authentication.getCredentials().toString();
        UserEntity user =  Optional.ofNullable(userRepository.findByEmail(email)).filter(u -> u.getPassword().equals(password))
                .orElseThrow(() -> new BadCredentialsException("user not found"));
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(null, user);
        token.setAuthenticated(true);
        return token;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(
                UsernamePasswordAuthenticationToken.class);
    }
}