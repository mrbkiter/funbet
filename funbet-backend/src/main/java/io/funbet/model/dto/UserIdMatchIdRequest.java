package io.funbet.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserIdMatchIdRequest
{
    List<Integer> userIds;

    List<Integer> matchIds;
}
