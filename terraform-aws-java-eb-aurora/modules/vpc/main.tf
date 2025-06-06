resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = { 
    Name = "vcdev-fbai-vpc"
    Environment = "dev"
    "vc:service"     = "vcdev-ai-test"
    "vc:owner"       = "viktor.nguyen"
    "vc:stack"       = "terraform"
    }
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
}

resource "aws_subnet" "public" {
  count             = length(var.public_subnets)
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.public_subnets[count.index]
  availability_zone = var.availability_zones[count.index]
  map_public_ip_on_launch = true
  tags = { Name = "public-${count.index}" }
}

resource "aws_subnet" "private" {
  count             = length(var.private_subnets)
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnets[count.index]
  availability_zone = var.availability_zones[count.index]
  tags = { Name = "private-${count.index}" }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route" "internet_access" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.gw.id
}

resource "aws_route_table_association" "public" {
  count          = length(aws_subnet.public)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table_association" "private" {
  count          = length(aws_subnet.private)
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private.id
}

resource "aws_db_subnet_group" "aurora" {
  name       = "aurora-subnet-group"
  subnet_ids = aws_subnet.private[*].id
  tags = { Name = "aurora-subnet-group" }
}

resource "aws_security_group" "beanstalk" {
    name        = "beanstalk-sg"
    description = "Allow inbound HTTP/HTTPS and outbound all"
    vpc_id      = aws_vpc.main.id

    ingress {
        description = "Allow HTTP"
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    # Add this ingress rule
    ingress {
        description = "Allow internal traffic to application port"
        from_port   = 4000
        to_port     = 4000
        protocol    = "tcp"
        self        = true  # Allows traffic from the same security group
    }
    ingress {
        description = "Allow HTTPS"
        from_port   = 443
        to_port     = 443
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        description      = "Allow all outbound traffic"
        from_port        = 0
        to_port          = 0
        protocol         = "-1"
        cidr_blocks      = ["0.0.0.0/0"]
    }
}

resource "aws_security_group" "aurora" {
    name        = "aurora-sg"
    description = "Allow inbound from Beanstalk instances"
    vpc_id      = aws_vpc.main.id

    ingress {
        description      = "Allow PostgreSQL from Beanstalk"
        from_port        = 5432
        to_port          = 5432
        protocol         = "tcp"
        security_groups  = [aws_security_group.beanstalk.id]
    }

    tags = {
        Name = "aurora-sg"
        Environment = "dev"
        "vc:service" = "vcdev-ai-test"
        "vc:owner"   = "viktor.nguyen"
        "vc:stack"   = "terraform"
    }
}
