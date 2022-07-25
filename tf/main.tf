terraform {
  required_providers {
    aws = {
      version = ">= 3.70.0"
      source  = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "ap-southeast-2"
}

resource "aws_ssm_parameter" "hello_1" {
  name  = "hello_1"
  type  = "String"
  value = "Hello, world!"
}

data "aws_ssm_parameter" "hello_1" {
  name = "hello_1"

  depends_on = [
    aws_ssm_parameter.hello_1
  ]
}

resource "aws_ssm_parameter" "hello_2" {
  name  = "hello_2"
  type  = "String"
  value = "${data.aws_ssm_parameter.hello_1.value}.. Again!"
}
