DROP VIEW IF EXISTS user_answer_prediction_view;
ALTER TABLE tournament_user_other_fee DROP CONSTRAINT IF EXISTS tournament_user_other_fee_prediction_id__fkey;

CREATE OR REPLACE VIEW user_answer_prediction_view AS
select tournament_prediction_id, user_id, array_agg(team_id) AS team_ids,  count(team_id) AS no_of_selected_teams
from tournament_prediction_team_user
GROUP BY tournament_prediction_id, user_id;

ALTER TABLE tournament_user_other_fee ADD COLUMN IF NOT EXISTS tournament_prediction_id INTEGER;

ALTER TABLE tournament_user_other_fee ADD CONSTRAINT tournament_user_other_fee_prediction_id__fkey FOREIGN KEY (tournament_prediction_id)
      REFERENCES tournament_prediction (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION;