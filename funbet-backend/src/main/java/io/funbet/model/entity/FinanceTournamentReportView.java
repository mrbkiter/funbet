package io.funbet.model.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "finance_tournament_report_view")
@Data
public class FinanceTournamentReportView
{
    @Id
    @Column(name = "user_id")
    Integer userId;

    @Column(name = "name")
    String name;
    @Column(name = "email")
    String email;
    @Column(name = "remaining_debt")
    Long remainingDebt;
    @Column(name = "contribution")
    Long contribution;
}
