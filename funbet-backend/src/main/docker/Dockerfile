FROM java:8

EXPOSE 8080

ADD funbet-app.jar app.jar

ADD run.sh /run.sh
RUN chmod +x /run.sh

ENTRYPOINT ["/run.sh"]
