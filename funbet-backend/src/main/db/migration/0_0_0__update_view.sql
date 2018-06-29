CREATE OR REPLACE VIEW finance_tournament_report_view AS
SELECT tournament_id, user_id, email, name,
SUM(CASE WHEN bet_status = 'LOSE' AND (paid = false OR paid is null) THEN bet_money
     WHEN bet_status = 'DRAW' AND (paid = false OR paid is null) THEN bet_money / 2
    ELSE 0 END) AS remaining_debt,
SUM(CASE WHEN bet_status = 'LOSE' AND paid = true THEN bet_money
     WHEN bet_status = 'DRAW' AND paid = true THEN bet_money / 2
    ELSE 0 END) AS contribution
FROM finance_user_match_view
GROUP BY tournament_id, user_id, email, name;


select * from tournament_prediction_team_user