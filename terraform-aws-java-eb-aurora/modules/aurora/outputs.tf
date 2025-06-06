output "jdbc_url" {
  description = "JDBC connection string for Aurora PostgreSQL"
  value = "jdbc:postgresql://${aws_rds_cluster.aurora.endpoint}:5432/${var.db_name}"
}