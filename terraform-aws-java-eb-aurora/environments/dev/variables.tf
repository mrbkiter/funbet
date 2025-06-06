variable "db_username" {
  description = "The username for the Aurora PostgreSQL database"
  type        = string
}

variable "db_password" {
  description = "The password for the Aurora PostgreSQL database"
  type        = string
  sensitive   = true
}

variable "db_name" {
  description = "The name of the Aurora PostgreSQL database"
  type        = string
}

variable "db_instance_class" {
  description = "The instance class for the Aurora PostgreSQL database"
  type        = string
  default     = "db.serverless"
}

variable "db_cluster_identifier" {
  description = "The identifier for the Aurora PostgreSQL database cluster"
  type        = string
}

variable "eb_application_name" {
  description = "The name of the Elastic Beanstalk application"
  type        = string
}

variable "eb_environment_name" {
  description = "The name of the Elastic Beanstalk environment"
  type        = string
}

variable "eb_instance_type" {
  description = "The instance type for the Elastic Beanstalk environment"
  type        = string
  default     = "t2.micro"
}

variable "eb_version_label" {
  description = "The version label for the Elastic Beanstalk application"
  type        = string
}

variable "public_access" {
  description = "Enable public access to the Elastic Beanstalk environment"
  type        = bool
  default     = true
}