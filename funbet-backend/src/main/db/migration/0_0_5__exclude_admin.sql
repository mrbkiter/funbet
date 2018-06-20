CREATE OR REPLACE VIEW finance_user_match_view AS
SELECT m.tournament_id, m."id" AS match_id, m.bet_money, ua.id AS user_id, ua."name" AS name,
ua.email AS email, um.bet_status, um.paid
FROM user_account ua
LEFT JOIN  user_match_bet um ON ua."id" = um.user_id
LEFT JOIN "match" m ON  um.match_id = m."id"
WHERE ua."role" != 'ADMIN';