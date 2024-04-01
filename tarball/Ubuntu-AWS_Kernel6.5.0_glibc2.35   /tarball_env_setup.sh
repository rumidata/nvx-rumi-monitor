#!/bin/bash

sudo apt-get install make
sudo apt-get install gcc

# node, npm and yarn 
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g yarn

# golang 
wget https://golang.org/dl/go1.20.6.linux-amd64.tar.gz
sudo tar -xvf go1.20.6.linux-amd64.tar.gz -C /usr/local
echo 'export PATH=$PATH:/usr/local/go/bin' >> $HOME/.profile
source $HOME/.profile
