package io.funbet.model.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "finance_other_fee_report_view")
@Data
public class FinanceOtherFeeReportView
{
    @Id
    @Column(name = "user_id")
    Integer userId;

    @Column(name = "tournament_id")
    Integer tournamentId;

    @Column(name = "name")
    String name;
    @Column(name = "email")
    String email;
    @Column(name = "remaining_debt_other_fee")
    Long remainingDebtOtherFee;
    @Column(name = "other_fee_contribution")
    Long otherFeeContribution;

    @Column(name = "remaining_bonus")
    Long remainingBonus;
    @Column(name = "paid_bonus")
    Long paidBonus;
}
