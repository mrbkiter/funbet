package io.funbet.config;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.core.env.Environment;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class EarlyDatabaseCreator implements BeanFactoryPostProcessor {

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        Environment env = beanFactory.getBean(Environment.class);
        
        String dataSourceUrl = env.getProperty("spring.datasource.url");
        String username = env.getProperty("spring.datasource.username");
        String password = env.getProperty("spring.datasource.password");
        
        if (dataSourceUrl == null || username == null) {
            return;
        }
        
        try {
            String dbName = extractDatabaseName(dataSourceUrl);
            String baseUrl = dataSourceUrl.substring(0, dataSourceUrl.lastIndexOf("/"));
            String postgresUrl = baseUrl + "/postgres";
            
            Class.forName("org.postgresql.Driver");
            
            try (Connection conn = DriverManager.getConnection(postgresUrl, username, password);
                 Statement stmt = conn.createStatement()) {
                
                ResultSet rs = stmt.executeQuery(
                    "SELECT 1 FROM pg_database WHERE datname = '" + dbName + "'");
                
                if (!rs.next()) {
                    stmt.executeUpdate("CREATE DATABASE " + dbName);
                    System.out.println("Created database: " + dbName);
                }
            }
        } catch (Exception e) {
            System.err.println("Could not auto-create database: " + e.getMessage());
        }
    }
    
    private String extractDatabaseName(String url) {
        int lastSlash = url.lastIndexOf("/");
        if (lastSlash > 0) {
            String dbName = url.substring(lastSlash + 1);
            int queryIndex = dbName.indexOf("?");
            if (queryIndex > 0) {
                dbName = dbName.substring(0, queryIndex);
            }
            return dbName;
        }
        return "funbet";
    }
}
