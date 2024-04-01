#!/bin/bash

sudo yum update

sudo yum install make
sudo yum install gcc

# Node.js and yarn
curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs
sudo npm install -g yarn

# golang
wget https://golang.org/dl/go1.20.6.linux-amd64.tar.gz
sudo tar -xvf go1.20.6.linux-amd64.tar.gz -C /usr/local
echo 'export PATH=$PATH:/usr/local/go/bin' >> $HOME/.profile
source $HOME/.profile
