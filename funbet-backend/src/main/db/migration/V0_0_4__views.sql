--DROP VIEW IF EXISTS match_view;
CREATE OR REPLACE VIEW match_view AS
SELECT m."id" AS id, m.tournament_id AS tournament_id,
 m.team_id_1 AS team_id_1, m.team_id_2 AS team_id_2, m.bet_score_1 AS bet_score_1,
m.bet_score_2 AS bet_score_2, m.score_1 AS score_1, m.score_2 AS score_2, m.start_timestamp AS start_timestamp,
te1."name" AS team_name_1, te2."name" AS team_name_2, m.bet_money AS bet_money, m.system_start_timestamp, m.timezone
FROM "match" m
JOIN team te1 ON m.team_id_1 = te1."id"
JOIN team te2 ON m.team_id_2 = te2."id";


CREATE OR REPLACE VIEW all_match_user_account_view AS
select  m."id" AS match_id, m.tournament_id AS tournament_id,
 m.team_id_1 AS team_id_1, m.team_id_2 AS team_id_2, m.bet_score_1 AS bet_score_1,
m.bet_score_2 AS bet_score_2, m.score_1 AS score_1, m.score_2 AS score_2, m.start_timestamp AS start_timestamp,
m.bet_money AS bet_money, m.system_start_timestamp, m.timezone,
ua.id AS user_id, ua.name, ua.email
FROM match m
CROSS JOIN user_account ua;

--DROP VIEW IF EXISTS user_match_view;
CREATE OR REPLACE VIEW user_match_view AS
SELECT row_number() OVER () as id, mua.match_id, mua.tournament_id,
 mua.team_id_1, mua.team_id_2, mua.bet_score_1 AS bet_score_1,
mua.bet_score_2 AS bet_score_2, mua.score_1 AS score_1, mua.score_2 AS score_2, mua.start_timestamp AS start_timestamp,
te1."name" AS team_name_1, te2."name" AS team_name_2, mua.bet_money AS bet_money, mua.system_start_timestamp, mua.timezone,
um.bet_status, mua.user_id, mua.name, mua.email, um.team_id AS selected_team_id, te."name" AS selected_team_name, um.paid
FROM all_match_user_account_view mua
LEFT JOIN user_match_bet um ON mua.match_id = um.match_id AND mua.user_id = um.user_id
LEFT JOIN team te ON um.team_id = te.id
JOIN team te1 ON mua.team_id_1 = te1."id"
JOIN team te2 ON mua.team_id_2 = te2."id";

--DROP VIEW IF EXISTS finance_user_match_view cascade;
CREATE OR REPLACE VIEW finance_user_match_view AS
SELECT m.tournament_id, m."id" AS match_id, m.bet_money, ua.id AS user_id, ua."name" AS name,
ua.email AS email, um.bet_status, um.paid
FROM user_account ua
LEFT JOIN  user_match_bet um ON ua."id" = um.user_id
LEFT JOIN "match" m ON  um.match_id = m."id";

CREATE OR REPLACE VIEW finance_tournament_report_view AS
SELECT tournament_id, user_id, email, name,
SUM(CASE WHEN bet_status = 'LOSE' AND (paid = false OR paid is null) THEN bet_money ELSE 0 END) AS remaining_debt,
SUM(CASE WHEN bet_status = 'LOSE' AND paid = true THEN bet_money ELSE 0 END) AS contribution
FROM finance_user_match_view
GROUP BY tournament_id, user_id, email, name;


--
--SELECT  mua.* , te.*, te1.*
-- FROM all_match_user_account_view mua
--LEFT JOIN user_match_bet um ON mua.match_id = um.match_id AND mua.user_id = um.user_id
--LEFT JOIN team te ON um.team_id = te.id
--JOIN team te1 ON mua.team_id_1 = te1."id"
--JOIN team te2 ON mua.team_id_2 = te2."id"
-- where mua.user_id = 3;


-- select * from user_match_view where user_id = 3;
--select * from finance_user_match_view;



--LEFT JOIN user_match_bet um ON m."id" = um.match_id
--WHERE ua.id = 3;
--WHERE paid is null;

--select * from user_match_bet;

--update user_match_bet SET paid = null;
