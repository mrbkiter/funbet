CREATE OR REPLACE VIEW tournament_prediction_view AS
WITH tmp AS
(
    SELECT tpa.tournament_prediction_id, string_agg(tpa.team_id::text, ',') AS team_ids,
    string_agg(t.name, ',') AS team_names
    FROM tournament_prediction_team_answer tpa
    JOIN team t ON tpa.team_id = t."id"
    GROUP BY tpa.tournament_prediction_id
)
SELECT tp."id", tp.tournament_id, tp."name", tp.bonus_amount, tp.end_timestamp, tp.no_of_team, tp.system_end_timestamp,
tpa.team_ids, tpa.team_names
FROM tournament_prediction tp
LEFT JOIN tmp tpa ON tp."id" = tpa.tournament_prediction_id;

select * from tournament_prediction_team_answer where tournament_prediction_id = 3;
select *  from tournament_user_other_fee;


 where tournament_prediction_id = 3;