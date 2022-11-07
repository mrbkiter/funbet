CREATE OR REPLACE VIEW finance_other_fee_report_view AS
    SELECT tournament_id, user_id, ua.email, ua.name,
     SUM(CASE WHEN o.other_fee_paid = false OR o.other_fee_paid IS NULL THEN o.other_fee ELSE 0 END) AS remaining_debt_other_fee,
     SUM(CASE WHEN o.other_fee_paid = true THEN o.other_fee ELSE 0 END) AS other_fee_contribution,
     SUM(CASE WHEN o.bonus_paid = false OR o.bonus_paid IS NULL THEN o.bonus ELSE 0 END) AS remaining_bonus,
     SUM(CASE WHEN o.bonus_paid = true THEN o.bonus ELSE 0 END) AS paid_bonus
         FROM tournament_user_other_fee o
         JOIN user_account ua ON o.user_id = ua."id"
         GROUP BY o.tournament_id, o.user_id, ua.email, ua.name;
