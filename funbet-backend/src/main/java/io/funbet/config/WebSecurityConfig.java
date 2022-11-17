package io.funbet.config;

import io.funbet.model.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.savedrequest.NullRequestCache;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
public class WebSecurityConfig extends WebSecurityConfigurerAdapter
{
    @Autowired
    AuthenticationProvider provider;

    /*@Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/resources/**", "/static/**");
    }*/
    final String USER_ROLE = UserEntity.Role.USER.name();
    final String ADMIN_ROLE = UserEntity.Role.ADMIN.name();

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        String[] adminUrls = {"/match/**", "/team/**", "/tournament/**", "/user/**"};

        http.authorizeRequests() //
                .antMatchers("/static/**", "/js/**", "/css/**", "/health-check").permitAll()
                .antMatchers(HttpMethod.PUT, "/match/**/bet").authenticated()
                .antMatchers(HttpMethod.POST, "/tournament/**/report", "/tournament/**/user").authenticated()
                .antMatchers(HttpMethod.PUT, "/user/**/loggingUser").authenticated()
                .antMatchers(HttpMethod.PUT, adminUrls).hasAuthority(ADMIN_ROLE)
                .antMatchers(HttpMethod.POST, adminUrls).hasAuthority(ADMIN_ROLE)
                .antMatchers(HttpMethod.DELETE, adminUrls).hasAuthority(ADMIN_ROLE)
                .antMatchers(HttpMethod.GET, "/admin/**").hasAuthority(ADMIN_ROLE)
                .anyRequest().authenticated() //
                .and()
                .requestCache().requestCache(new NullRequestCache()) //
                .and().formLogin().loginPage("/login").permitAll() //
                .and().logout().logoutUrl("/logout")
                .and().csrf().disable();
    }

    @Autowired
    void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(provider) //
        ;
    }
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4001"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE", "OPTIONS"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
