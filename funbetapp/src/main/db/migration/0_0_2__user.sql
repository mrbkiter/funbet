CREATE TABLE IF NOT EXISTS "user"
(
    id VARCHAR(50) NOT NULL,
    role VARCHAR(10) NOT NULL,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(100) NOT NULL,
    lock boolean,
    insert_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    last_update_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),

    CONSTRAINT user_id__pk PRIMARY KEY (id),
    CONSTRAINT user_email__uniq UNIQUE (email)
);