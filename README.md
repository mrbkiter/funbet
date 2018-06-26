# funbet

Funbet is a side project for fun gambling. There is no winners or losers but just for fun. The collected money would be used for party and company trip.

Technical stack:

- springboot 2.0
- vuejs 2

How to deploy:

- Build maven: mvn clean package
- Set env: 

JDBC_URL. Default is jdbc:postgresql://localhost/funbet <br />
USER_NAME. Default is dbapplication_user <br />
PASSWORD. Default is dbapplication_user <br />
SERVER_PORT. Default is 9111. <br />

- Run jar: java -jar <jar file>. 

* Start app use Inteliji
From Project view, select [root]/funbet-backend/src/main/java/io/funbet/config/FunbetBoot.java
right click & select Run 