--ALTER TABLE tournament_user ADD COLUMN IF NOT EXISTS other_fee INTEGER DEFAULT 0;
--ALTER TABLE tournament_user ADD COLUMN IF NOT EXISTS bonus INTEGER DEFAULT 0;
--ALTER TABLE tournament_user ADD COLUMN IF NOT EXISTS paid boolean;

--ALTER TABLE tournament_user DROP COLUMN other_fee;
--ALTER TABLE tournament_user DROP COLUMN bonus;
--ALTER TABLE tournament_user DROP COLUMN paid;

--DROP TABLE IF EXISTS tournament_user_other_fee;

CREATE TABLE IF NOT EXISTS tournament_user_other_fee
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    tournament_id INTEGER,
    other_fee INTEGER DEFAULT 0 NOT NULL,
    bonus INTEGER DEFAULT 0 NOT NULL,
    note TEXT,
    other_fee_paid boolean,
    bonus_paid boolean,
    insert_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT tournament_user_history_tournament_id__fkey FOREIGN KEY (tournament_id)
      REFERENCES tournament (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT tournament_user_history_user_id__fkey FOREIGN KEY (user_id)
      REFERENCES user_account (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);


--delete from tournament_user;