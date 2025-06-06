# Terraform AWS Java Elastic Beanstalk and Aurora PostgreSQL

This project provisions an Aurora PostgreSQL serverless database and an AWS Elastic Beanstalk environment for deploying a Java application (JAR file). 

## Project Structure

```
terraform-aws-java-eb-aurora
├── modules
│   ├── aurora
│   │   └── main.tf         # Terraform configuration for Aurora PostgreSQL
│   └── elastic_beanstalk
│       └── main.tf         # Terraform configuration for Elastic Beanstalk
├── environments
│   └── dev
│       ├── main.tf         # Development environment configuration
│       ├── variables.tf     # Input variables for the development environment
│       └── outputs.tf       # Outputs for the development environment
├── variables.tf             # Global variables for the project
├── outputs.tf               # Outputs for the entire project
├── provider.tf              # AWS provider configuration
└── README.md                # Project documentation
```

## Prerequisites

- Terraform installed on your machine.
- AWS account with appropriate permissions to create resources.
- AWS CLI configured with your credentials.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd terraform-aws-java-eb-aurora
   ```

2. Navigate to the `environments/dev` directory:
   ```
   cd environments/dev
   ```

3. Initialize Terraform:
   ```
   terraform init
   ```

4. Review and customize the `variables.tf` file to set your desired configurations, such as database credentials and instance types.

5. Plan the deployment:
   ```
   terraform plan
   ```

6. Apply the configuration to provision the resources:
   ```
   terraform apply
   ```

## Usage Guidelines

- After deployment, you can access the Elastic Beanstalk application using the provided URL in the outputs.
- The Aurora PostgreSQL database can be accessed using the endpoint provided in the outputs, along with the configured credentials.

## Additional Information

For more details on how to manage the resources created by this project, refer to the official Terraform and AWS documentation.