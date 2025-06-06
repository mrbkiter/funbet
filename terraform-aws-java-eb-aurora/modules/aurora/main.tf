resource "aws_rds_cluster" "aurora" {
  cluster_identifier      = "vcdev-fbai-aurora-serverless-cluster"
  engine                 = "aurora-postgresql"
  engine_mode            = "provisioned"
  master_username         = var.db_username
  master_password         = var.db_password
  database_name           = var.db_name
  skip_final_snapshot     = true

  serverlessv2_scaling_configuration {
    min_capacity = 0.5
    max_capacity = 2
  }

  vpc_security_group_ids = var.vpc_security_group_ids
  db_subnet_group_name   = var.db_subnet_group_name

  tags = {
    Name        = "vcdev-ai-test-rds-cluster"
    Environment = "dev"
    "vc:service"     = "vcdev-ai-test"
    "vc:owner"       = "viktor.nguyen"
    "vc:stack"       = "terraform"
  }
}


resource "aws_rds_cluster_instance" "aurora_instance" {
  cluster_identifier = aws_rds_cluster.aurora.id
  instance_class     = "db.serverless"
  engine            = aws_rds_cluster.aurora.engine

  #add security group
  tags = {
    Name        = "vcdev-ai-test-rds-instance"
    Environment = "dev"
    "vc:service"     = "vcdev-ai-test"
    "vc:owner"       = "viktor.nguyen"
    "vc:stack"       = "terraform"
  }
}


