DROP VIEW IF EXISTS match_view;
CREATE OR REPLACE VIEW match_view AS
SELECT m."id" AS id, m.tournament_id AS tournament_id,
 m.team_id_1 AS team_id_1, m.team_id_2 AS team_id_2, m.bet_score_1 AS bet_score_1,
m.bet_score_2 AS bet_score_2, m.score_1 AS score_1, m.score_2 AS score_2, m.start_timestamp AS start_timestamp,
te1."name" AS team_name_1, te2."name" AS team_name_2, m.bet_money AS bet_money, m.system_start_timestamp, m.timezone
FROM "match" m
JOIN team te1 ON m.team_id_1 = te1."id"
JOIN team te2 ON m.team_id_2 = te2."id";
