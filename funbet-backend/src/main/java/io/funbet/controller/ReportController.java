package io.funbet.controller;

import io.funbet.model.Table;
import io.funbet.model.dto.UserIdMatchIdRequest;
import io.funbet.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/report")
public class ReportController
{
    @Autowired
    MatchService matchService;

    @PostMapping("/tableboard")
    public Table tableBoardReport(@RequestBody UserIdMatchIdRequest request)
    {
        return matchService.getMatchResultTable(request.getMatchIds(), request.getUserIds());
    }
}
