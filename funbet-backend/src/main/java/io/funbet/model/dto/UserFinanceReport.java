package io.funbet.model.dto;

import lombok.Data;

@Data
public class UserFinanceReport
{
    Integer userId;

    Integer tournamentId;

    String name;
    String email;
    Long remainingDebtOtherFee;
    Long otherFeeContribution;

    Long remainingBonus;
    Long paidBonus;
    Long remainingDebt;
    Long contribution;
}
