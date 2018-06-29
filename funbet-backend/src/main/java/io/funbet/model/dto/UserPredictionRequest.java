package io.funbet.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserPredictionRequest
{
    List<Integer> teamIds;
}
