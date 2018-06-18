# funbet

Funbet is a side project for fun gambling. There is no winners or losers but just for fun. The collected money would be used for party and company trip.

Technical stack:

- springboot 2.0
- vuejs 2

How to deploy:

- Build maven: mvn clean package
- Set env: 

-- JDBC_URL. Default is jdbc:postgresql://localhost/funbet
-- USER_NAME. Default is dbapplication_user
-- PASSWORD. Default is dbapplication_user
-- SERVER_PORT. Default is 9111.
- Run jar: java -jar <jar file>. 
