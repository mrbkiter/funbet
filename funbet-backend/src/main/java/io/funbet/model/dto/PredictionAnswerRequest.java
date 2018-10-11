package io.funbet.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class PredictionAnswerRequest
{
    List<Integer> teamIds;
}
