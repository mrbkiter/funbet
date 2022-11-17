package io.funbet.controller;

import io.funbet.model.entity.UserEntity;
import io.funbet.utils.WebUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController
{
    @GetMapping(value = "/")
    public String index() {
        UserEntity user = WebUtils.getLoggedInUser();
        if(user.getRole() == UserEntity.Role.ADMIN)
            return "index";
        else
            return "vue/dist/index";
//            return "tournament-page";
    }

    @GetMapping(value = "/health-check")
    @ResponseBody
    public String healthcheck() {
        return "ok";
    }

    @GetMapping(value = "/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping(value = "/app")
    public String app() {
        UserEntity user = WebUtils.getLoggedInUser();
        if(user.getRole() == UserEntity.Role.ADMIN)
            return "vue/dist/index";
        else
            return "vue/dist/index";
    }

}
