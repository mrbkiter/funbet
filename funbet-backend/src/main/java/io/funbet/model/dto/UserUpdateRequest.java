package io.funbet.model.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class UserUpdateRequest
{
    @NotEmpty
    String name;
    @NotEmpty
    String email;
    @NotEmpty
    String password;
}
