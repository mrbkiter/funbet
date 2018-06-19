#!/bin/bash
export JAVA_OPTS=${JAVA_OPTS:-"-Xmx1024m -Xms512m"}

if [ -a /newrelic/newrelic.jar ]
then
	echo "Enable newrelic java agent ...."
	exec java $JAVA_OPTS -javaagent:/newrelic/newrelic.jar -Djava.security.egd=file:/dev/./urandom -jar /app.jar

else
	exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar
fi
