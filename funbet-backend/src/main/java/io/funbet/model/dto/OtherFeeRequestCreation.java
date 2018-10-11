package io.funbet.model.dto;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
public class OtherFeeRequestCreation
{
    String note;

    @NotNull
    @Min(0)
    Integer fee;
}
