--DROP TABLE IF EXISTS "user";
--DROP TABLE IF EXISTS tournament_user;
--DROP TABLE IF EXISTS user_match_bet;
--DROP TABLE IF EXISTS match;
--DROP TABLE IF EXISTS tournament_team;
--DROP TABLE IF EXISTS tournament;
--DROP TABLE IF EXISTS team;
--DROP TABLE IF EXISTS user_account;

CREATE TABLE IF NOT EXISTS user_account
(
    id serial NOT NULL,
    role VARCHAR(10) NOT NULL,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(100) NOT NULL,
    lock boolean,
    password VARCHAR(500) NOT NULL,
    insert_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    last_update_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),

    CONSTRAINT user_id__pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS team
(
    id serial NOT NULL,
    name VARCHAR(100) NOT NULL UNIQUE,
    insert_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT team_id__pk PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS tournament
(
    id serial NOT NULL,
    name VARCHAR(100) NOT NULL UNIQUE,
    default_money_bet INTEGER NOT NULL,
    insert_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT tournament_id__pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tournament_team
(
    team_id INTEGER,
    tournament_id INTEGER,
    insert_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT tournament_team__pk PRIMARY KEY (team_id, tournament_id),
    CONSTRAINT tournament_team_tournament_id__fkey FOREIGN KEY (tournament_id)
      REFERENCES tournament (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT tournament_team_team_id__pk FOREIGN KEY (team_id) REFERENCES team(id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION
);

--DROP TABLE IF EXISTS user_match_bet;
--DROP VIEW IF EXISTS match_view;
--DROP TABLE IF EXISTS match;
CREATE TABLE IF NOT EXISTS match
(
    id serial NOT NULL,
    tournament_id INTEGER,
    team_id_1 INTEGER,
    team_id_2 INTEGER,
    bet_score_1 NUMERIC(3,1),
    bet_score_2 NUMERIC(3,1),
    score_1 smallint,
    score_2 smallint,
    start_timestamp TIMESTAMP WITHOUT TIME ZONE,
    timezone VARCHAR(200),
    system_start_timestamp TIMESTAMP WITH TIME ZONE,
    insert_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT match_id__pk PRIMARY KEY (id),
    bet_money INTEGER NOT NULL,
    CONSTRAINT match_tournament_id__fkey FOREIGN KEY (tournament_id)
      REFERENCES tournament (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT match_team_id_1__pk FOREIGN KEY (team_id_1) REFERENCES team(id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT match_team_id_2__pk FOREIGN KEY (team_id_2) REFERENCES team(id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION
);

--DROP TABLE user_match_bet CASCADE;

CREATE TABLE IF NOT EXISTS user_match_bet
(
    user_id INTEGER,
    match_id INTEGER,
    team_id INTEGER,
    bet_status VARCHAR(50),
    last_updated_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    insert_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    paid boolean,
    CONSTRAINT user_match_bet__pk PRIMARY KEY(user_id, match_id),
    CONSTRAINT user_match_bet_team_id__fkey FOREIGN KEY (team_id)
      REFERENCES team (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
     CONSTRAINT user_match_bet_match_id__fkey FOREIGN KEY (match_id)
      REFERENCES match (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT user_match_bet_user_id__fkey FOREIGN KEY (user_id)
      REFERENCES user_account (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS tournament_user
(
    user_id INTEGER,
    tournament_id INTEGER,
    insert_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT user_tournament__pk PRIMARY KEY(user_id, tournament_id),
    CONSTRAINT user_tournament_tournament_id__fkey FOREIGN KEY (tournament_id)
      REFERENCES tournament (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT user_tournament_user_id__fkey FOREIGN KEY (user_id)
      REFERENCES user_account (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

DELETE FROM user_account WHERE email = 'sysadmin@funbet';
INSERT INTO user_account(email, password, "name", "role") values ('sysadmin@funbet', 'password', 'Sys Admin', 'ADMIN');


--SELECT * FROM "match";

--select * from tournament;

select * from user_match_bet;