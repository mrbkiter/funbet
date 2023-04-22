DELETE FROM user_account WHERE email = 'admin';
INSERT INTO user_account(email, password, "name", "role") values ('admin', 'seagames2023', 'Admin', 'ADMIN');
