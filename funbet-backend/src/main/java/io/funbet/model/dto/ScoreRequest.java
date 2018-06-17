package io.funbet.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class ScoreRequest {
    @NotNull
    @Min(0)
    Integer score1;
    @NotNull
    @Min(0)
    Integer score2;
}
