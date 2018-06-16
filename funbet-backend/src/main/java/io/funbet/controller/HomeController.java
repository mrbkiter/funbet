package io.funbet.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController
{
    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @RequestMapping(value = "/tournament-page")
    public String tournamentPage() {
        return "tournament-page";
    }


    @RequestMapping(value = "/user-page")
    public String userPage() {
        return "user-page";
    }

    @RequestMapping(value = "/team-page")
    public String teamPage() {
        return "team-page";
    }
}
