package io.funbet.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/page")
public class PageController
{
    @RequestMapping(value = "/admin-tournament")
    public String adminTournamentPage() {
        return "admin-tournament-page";
    }

    @RequestMapping(value = "/tournament")
    public String tournamentPage() {
        return "tournament-page";
    }

    @RequestMapping(value = "/user")
    public String userPage() {
        return "user-page";
    }

    @RequestMapping(value = "/team")
    public String teamPage() {
        return "team-page";
    }
}
