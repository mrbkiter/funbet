DROP TABLE IF EXISTS tournament_other_fee;
CREATE TABLE IF NOT EXISTS tournament_other_fee
(
    id serial PRIMARY KEY,
    tournament_id INTEGER,
    other_fee INTEGER NOT NULL,
    note TEXT,
    insert_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT ttournament_other_fee_tournament_id__fkey FOREIGN KEY (tournament_id)
      REFERENCES tournament (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);