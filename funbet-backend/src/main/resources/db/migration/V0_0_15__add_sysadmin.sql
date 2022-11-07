DELETE FROM user_account WHERE email = 'admin';
INSERT INTO user_account(email, password, "name", "role") values ('admin', 'worldcup2022', 'Admin', 'ADMIN');
