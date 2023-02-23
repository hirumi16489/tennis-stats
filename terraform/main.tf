# EC2 instance
resource "aws_instance" "ec2_dev" {
  instance_type          = var.instance_type
  ami                    = "ami-00575c0cbc20caf50"
  vpc_security_group_ids = [aws_security_group.my_sg.id]
  subnet_id              = aws_subnet.my_public_subnet.id
  key_name               = aws_key_pair.key_pair.id
  user_data              = file("./userdata.sh")

  root_block_device {
    volume_size = 20
  }
  tags = {
    Name = "dev-node"
  }
}

# Security group
resource "aws_security_group" "my_sg" {
  name        = "dev_sg"
  description = "dev security group"
  vpc_id      = aws_vpc.my_vpc.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# OUTPUT
output "aws_instance_public_dns" {
  value = aws_instance.ec2_dev.public_dns
}