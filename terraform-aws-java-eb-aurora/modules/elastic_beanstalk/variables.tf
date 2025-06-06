variable "app_name" {
  description = "Name of the Elastic Beanstalk application"
  type        = string
}

variable "env_name" {
  description = "Name of the Elastic Beanstalk environment"
  type        = string
}

variable "db_username" {
  description = "Aurora DB username"
  type        = string
}

variable "db_password" {
  description = "Aurora DB password"
  type        = string
  sensitive   = true
}

variable "instance_type" {
  description = "EC2 instance type for Beanstalk"
  type        = string
  default     = "t3.micro"
}

#include postgres connection variables
variable "postgres_connection_string" {
  description = "PostgreSQL connection string for the application"
  type        = string
}

variable "vpc_id" {
    description = "VPC ID where the Elastic Beanstalk environment will be deployed"
    type        = string
}

variable "public_subnet_ids" {
    description = "List of public subnet IDs for the Elastic Beanstalk environment"
    type        = list(string)
}

variable "security_group_id" {
    description = "List of security group IDs to associate with the Elastic Beanstalk environment"
    type        = string
}