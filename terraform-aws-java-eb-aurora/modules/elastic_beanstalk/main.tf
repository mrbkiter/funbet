resource "aws_elastic_beanstalk_application" "java_app" {
  name        = "vcdev-fbai-beanstalk-app"
  description = "Elastic Beanstalk application for Java"
  tags = {
    Name        = "vcdev-fbai-beanstalk-app"
    Environment = "dev"
    "vc:service"     = "vcdev-ai-test"
    "vc:owner"       = "viktor.nguyen"
    "vc:stack"       = "terraform"
  }
}

resource "aws_elastic_beanstalk_environment" "java_env" {
  name                = "java-fbai-env"
  application         = aws_elastic_beanstalk_application.java_app.name
  solution_stack_name = "64bit Amazon Linux 2023 v4.5.2 running Corretto 8"

  # Fix the application port to match what you've set (4000)
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "PORT"
    value     = "4000"  # Make sure this matches your app's listening port
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment:process:default"
    name      = "Port"
    value     = 4000
  }
  # VPC Configuration
  setting {
    namespace = "aws:ec2:vpc"
    name      = "VPCId"
    value     = var.vpc_id
  }
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = aws_iam_instance_profile.eb_instance_profile.name
  }
  setting {
    namespace = "aws:ec2:vpc"
    name      = "Subnets"
    value     = join(",", var.public_subnet_ids)
  }
  # Set instance type to t3.micro (lowest cost)
  setting {
    namespace = "aws:ec2:instances"
    name      = "InstanceTypes"
    value     = "t3.micro"
  }
  setting {
    namespace = "aws:ec2:instances"
    name      = "SpotAllocationStrategy"
    value     = "lowest-price"
  }
  
  # Minimize the number of instances
  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MinSize"
    value     = "1"
  }
  
  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MaxSize"
    value     = "2"
  }
  
  # Use spot instances for lower cost
  setting {
    namespace = "aws:ec2:instances"
    name      = "EnableSpot"
    value     = "true"
  }
  
  # Configure the load balancer to forward to port 8080
  setting {
    namespace = "aws:elasticbeanstalk:application" 
    name      = "Application Healthcheck URL"
    value     = "/health-check"  # Adjust based on your app's health endpoint
  }
    # Tell Elastic Beanstalk the application is listening on port 8080
    setting {
      namespace = "aws:elb:listener"
      name      = "InstancePort"
      value     = "80"
    }

    # Configure the instance port mapping
    setting {
      namespace = "aws:elb:listener:80"
      name      = "InstancePort"
      value     = "4000"
    }

  setting {
    namespace = "aws:elb:listener:80"
    name      = "ListenerProtocol"
    value     = "HTTP"
  }
  
  # Forward HTTP traffic to your application
  setting {
    namespace = "aws:elasticbeanstalk:environment:process:default"
    name      = "HealthCheckPath"
    value     = "/"  # Change to your health check endpoint if different
  }
  
  setting {
    namespace = "aws:elasticbeanstalk:environment:process:default"
    name      = "MatcherHTTPCode"
    value     = "200"
  }

  # Set the spot max price (optional)
  setting {
    namespace = "aws:ec2:instances" 
    name      = "SpotMaxPrice"
    value     = ""  # Empty string means on-demand price
  }
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "SecurityGroups"
    value     = var.security_group_id
  }

  setting {
    namespace = "aws:elb:loadbalancer"
    name      = "SecurityGroups"
    value     = var.security_group_id
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "DisableDefaultEC2SecurityGroup"
    value     = "true"
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = "LoadBalanced"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "JDBC_URL"
    value     = "${var.postgres_connection_string}"
  }
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "SERVER_PORT"
    value     = "4000"
  }
  
}

data "aws_s3_bucket" "app_bucket" {
  bucket = "dev-cluster-temp-file"
}

data "aws_s3_object" "app_jar" {
  bucket = data.aws_s3_bucket.app_bucket.bucket
  key    = "app.jar"
  tags = {
    Name        = "vcdev-ai-test-app-jar"
    Environment = "dev"
    service     = "vcdev-ai-test"
    owner       = "viktor.nguyen"
    stack       = "terraform"
  }
}

resource "aws_elastic_beanstalk_application_version" "app_version" {
  bucket = data.aws_s3_bucket.app_bucket.bucket
  key    = data.aws_s3_object.app_jar.key
  name   = "java-app-v1"
  application = aws_elastic_beanstalk_application.java_app.name
  
}
resource "aws_iam_role" "eb_instance_role" {
  name = "eb-instance-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "eb_instance_role_policy" {
  role       = aws_iam_role.eb_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier"
}

resource "aws_iam_instance_profile" "eb_instance_profile" {
  name = "eb-instance-profile"
  role = aws_iam_role.eb_instance_role.name
}
