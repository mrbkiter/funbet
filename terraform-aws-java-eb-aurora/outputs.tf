output "aurora_endpoint" {
  value = module.aurora.db_endpoint
}

output "elastic_beanstalk_url" {
  value = module.elastic_beanstalk.url
}