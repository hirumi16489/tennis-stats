terraform {
  required_providers {
    acme = {
      source = "vancluever/acme"
    }
  }
}
provider "acme" {
  server_url = var.server_url
}
provider "tls" {}

provider "aws" {
  region = var.region
}