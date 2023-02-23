variable "region" {
  default = "eu-west-3"
  type    = string
}

variable "instance_type" {
  type    = string
  default = "t2.micro"
}


variable "server_url" {
  type    = string
  default = "https://acme-v02.api.letsencrypt.org/directory"
}