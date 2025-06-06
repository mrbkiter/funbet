module "vpc" {
  source = "../../modules/vpc"
}

module "aurora" {
  source              = "../../modules/aurora"
  db_username         = var.db_username
  db_password         = var.db_password
  db_name             = var.db_name
  vpc_security_group_ids = [module.vpc.aurora_security_group_id]
  db_subnet_group_name = module.vpc.db_subnet_group_name
}

module "elastic_beanstalk" {
  source              = "../../modules/elastic_beanstalk"
  app_name            = var.eb_application_name
  env_name            = var.eb_environment_name
  db_username         = var.db_username
  db_password         = var.db_password
  postgres_connection_string = module.aurora.jdbc_url
  instance_type       = var.eb_instance_type
  public_subnet_ids = module.vpc.public_subnet_ids
  vpc_id              = module.vpc.vpc_id
  security_group_id   = module.vpc.beanstalk_security_group_id
}
