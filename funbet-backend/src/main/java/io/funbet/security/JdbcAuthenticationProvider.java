package io.funbet.security;

import io.funbet.model.entity.UserEntity;
import io.funbet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;
import org.thymeleaf.util.StringUtils;

import java.util.Optional;

@Component
public class JdbcAuthenticationProvider
        implements AuthenticationProvider {

    @Autowired
    UserRepository userRepository;

    @Override
    @Cacheable(value = "funbet",
            key = "'user#' + #authentication.getName().hashCode() + '#' + #authentication.getCredentials().toString().hashCode()",
    condition = "#authentication.getCredentials() != null")
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {

        String email = authentication.getName();
        String password = authentication.getCredentials().toString();
        UsernamePasswordAuthenticationToken token =  Optional.ofNullable(userRepository.findByEmail(email.toLowerCase()))
                .filter(u -> u.getPassword().equals(password))
                .map(u -> new UsernamePasswordAuthenticationToken(email, password, null))
                .orElseThrow(() -> new BadCredentialsException("Authentication failed for user = " + email));

        return token;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(
                UsernamePasswordAuthenticationToken.class);
    }
}