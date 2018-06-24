package io.funbet.model.dto;

import lombok.Data;

@Data
public class UserFinanceReport
{
    Integer userId;

    Integer tournamentId;

    String name;
    String email;
    long remainingDebtOtherFee;
    long otherFeeContribution;

    long remainingBonus;
    long paidBonus;
    long remainingDebt;
    long contribution;
}
