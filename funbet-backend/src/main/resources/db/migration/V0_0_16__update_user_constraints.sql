ALTER TABLE tournament_user DROP CONSTRAINT user_tournament_user_id__fkey;
ALTER TABLE user_match_bet DROP CONSTRAINT user_match_bet_user_id__fkey;
ALTER TABLE tournament_user_other_fee DROP CONSTRAINT tournament_user_history_user_id__fkey;
ALTER TABLE tournament_prediction_team_user DROP CONSTRAINT tournament_prediction_team_user_id__pk;


ALTER TABLE tournament_user ADD CONSTRAINT user_tournament_user_id__fkey FOREIGN KEY (user_id)
                                  REFERENCES user_account (id) MATCH SIMPLE
                                  ON UPDATE CASCADE ON DELETE NO ACTION;
ALTER TABLE user_match_bet ADD CONSTRAINT user_match_bet_user_id__fkey FOREIGN KEY (user_id)
                                     REFERENCES user_account (id) MATCH SIMPLE
                                     ON UPDATE CASCADE ON DELETE NO ACTION;
ALTER TABLE tournament_user_other_fee ADD CONSTRAINT tournament_user_history_user_id__fkey FOREIGN KEY (user_id)
                                     REFERENCES user_account (id) MATCH SIMPLE
                                     ON UPDATE CASCADE ON DELETE NO ACTION;
ALTER TABLE tournament_prediction_team_user ADD CONSTRAINT tournament_prediction_team_user_id__pk FOREIGN KEY (user_id)
                                                      REFERENCES user_account (id) MATCH SIMPLE
                                                      ON UPDATE CASCADE ON DELETE NO ACTION;