#!/bin/bash

sudo yum update

sudo yum install make
sudo yum install gcc
sudo yum install wget

# Node.js and yarn
curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs
sudo npm install -g yarn

# golang
wget https://golang.org/dl/go1.20.6.linux-amd64.tar.gz
sudo tar -xvf go1.20.6.linux-amd64.tar.gz -C /usr/local
echo 'export PATH=$PATH:/usr/local/go/bin' >> $HOME/.profile
source $HOME/.profile

echo "Checking the versions of Node, npm, Yarn, and Golang installed on the machine, necessary for tarball creation:"

# Check Node.js version
echo "Node.js version:"
node -v

# Check npm version
echo "npm version:"
npm -v

# Check Yarn version
echo "Yarn version:"
yarn -v

# Check Go version
echo "Go version:"
go version

