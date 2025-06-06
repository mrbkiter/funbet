variable "db_username" {
  description = "Master username for the Aurora PostgreSQL cluster"
  type        = string
}

variable "db_password" {
  description = "Master password for the Aurora PostgreSQL cluster"
  type        = string
  sensitive   = true
}

variable "db_name" {
  description = "Database name for the Aurora PostgreSQL cluster"
  type        = string
  default     = "fbai"
}

variable "vpc_security_group_ids" {
    description = "List of VPC security group IDs to associate with the Aurora PostgreSQL cluster"
    type        = list(string)
}

variable "db_subnet_group_name" {
  description = "Name of the DB subnet group for the Aurora PostgreSQL cluster"
  type        = string
}