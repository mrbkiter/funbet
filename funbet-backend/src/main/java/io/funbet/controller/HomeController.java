package io.funbet.controller;

import io.funbet.model.entity.UserEntity;
import io.funbet.utils.WebUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController
{
    @RequestMapping(value = "/")
    public String index() {
        UserEntity user = WebUtils.getLoggedInUser();
        if(user.getRole() == UserEntity.Role.ADMIN)
            return "index";
        else
            return "tournament-page";
    }
}
