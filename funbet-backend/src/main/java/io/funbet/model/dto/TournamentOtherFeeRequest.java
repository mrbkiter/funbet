package io.funbet.model.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class TournamentOtherFeeRequest
{
    @NotEmpty
    String note;
    @NotNull
    Integer amount;
}
