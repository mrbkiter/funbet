select * from user_account;

--insert into user_account(name, email, role, password) values ('sysadmin', 'sysadmin', 'ADMIN', '1');
--insert into user_account(name, email, role, password) values ('user', 'user', 'USER', '1');

DROP TABLE IF EXISTS tournament_prediction cascade;

CREATE TABLE IF NOT EXISTS tournament_prediction
(
    id serial PRIMARY KEY,
    name TEXT NOT NULL,
    tournament_id INTEGER,
    no_of_team smallint NOT NULL DEFAULT 1,
    bonus_amount INTEGER NOT NULL,
    end_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    system_end_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    insert_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    last_update_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),

    CONSTRAINT tournament_prediction_tournament_id__fkey FOREIGN KEY (tournament_id)
      REFERENCES tournament (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS tournament_prediction_team_answer
(
    tournament_prediction_id INTEGER,
    team_id INTEGER,
    insert_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    last_update_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),

    CONSTRAINT tournament_prediction_team__pkey PRIMARY KEY(tournament_prediction_id, team_id),
    CONSTRAINT tournament_prediction_team_prediction_id__fkey
    FOREIGN KEY (tournament_prediction_id)
      REFERENCES tournament_prediction (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT tournament_prediction_team_id__pk FOREIGN KEY (team_id)
      REFERENCES team (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS tournament_prediction_team_user
(
    tournament_prediction_id INTEGER,
    team_id INTEGER,
    user_id INTEGER,
    insert_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    last_update_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),

    CONSTRAINT tournament_prediction_team_user__pkey PRIMARY KEY(tournament_prediction_id, team_id, user_id),
    CONSTRAINT tournament_prediction_team_user_prediction_id__fkey
    FOREIGN KEY (tournament_prediction_id)
      REFERENCES tournament_prediction (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT tournament_prediction_team_user_team_id__pk FOREIGN KEY (team_id)
      REFERENCES team (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT tournament_prediction_team_user_id__pk FOREIGN KEY (user_id)
      REFERENCES user_account (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
);