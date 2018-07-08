
CREATE OR REPLACE VIEW tournament_user_bonus_view as
WITH tmp AS
(
    SELECT user_id, tournament_prediction_id, user_name,
    array_agg (team_id) AS selected_team_ids, string_agg (team_name, ',') AS teams, count(team_id) AS no_of_selected_teams
    FROM (
    SELECT tpt.user_id, tpt.team_id, tpt.tournament_prediction_id, t."name" AS team_name, ua."name" AS user_name
    FROM tournament_prediction_team_user tpt
    JOIN team t ON tpt.team_id = t."id"
    JOIN user_account ua ON tpt.user_id = ua."id") tmp1
    GROUP BY  user_id, tournament_prediction_id, user_name
)
SELECT row_number() OVER () as id, tp."id" AS tournament_prediction_id, tp.name AS name, tp.tournament_id, tp.bonus_amount, tp.end_timestamp, tp.no_of_team, tp.system_end_timestamp
,tpt.user_id, ua.name as user_name, tpt.selected_team_ids, tpt.teams, tp.team_names AS answered_teams,
CASE WHEN tp.team_ids IS NOT NULL AND tp.no_of_team = tpt.no_of_selected_teams AND tp.team_ids @> tpt.selected_team_ids THEN 'WIN'
 WHEN tp.team_ids IS NOT NULL AND tpt.selected_team_ids IS NOT NULL THEN 'LOSE'
ELSE null END AS prediction_status
, ua.id AS user_id1, ua.role
 FROM
tournament_prediction_view tp
CROSS JOIN user_account ua
LEFT JOIN tmp tpt ON tp."id" = tpt.tournament_prediction_id AND tpt.user_id = ua.id
WHERE ua.id = user_id OR (user_id IS null);
