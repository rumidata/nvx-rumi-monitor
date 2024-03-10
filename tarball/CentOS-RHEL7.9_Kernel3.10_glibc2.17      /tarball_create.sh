#!/bin/bash

# Function to check Node.js version
check_node_version() {
  if ! command -v node &> /dev/null; then
    echo "Node.js is not installed."
    return 1
  fi

  NODE_VERSION=$(node -v | grep -oP '^v\K16')
  if [ "$NODE_VERSION" != "16" ]; then
    echo "Node.js version 16 is required."
    return 1
  fi
}

# Function to check Yarn version
check_yarn_version() {
  if ! command -v yarn &> /dev/null; then
    echo "Yarn is not installed."
    return 1
  fi

  # Since yarn doesn't follow semantic versioning in its version command,
  # and it's challenging to enforce a specific version without knowing how it's used,
  # we just check if it's installed.
}

# Function to check Go version
check_go_version() {
  if ! command -v go &> /dev/null; then
    echo "Go is not installed."
    return 1
  fi

  GO_VERSION=$(go version | grep -oP 'go1\.20\.6')
  if [ "$GO_VERSION" != "go1.20.6" ]; then
    echo "Go version 1.20.6 is required."
    return 1
  fi
}

# Check all versions
check_node_version && check_yarn_version && check_go_version

if [ $? -eq 0 ]; then
  echo "All required versions of the Go, Node and Yarn are installed. We are good to go."
else
  echo "Required versions and dependencies of Go, Node and Yarn are not installed."
  exit 1
fi


export CGO_ENABLED=1

if [ -f yarn.lock ]; then
  rm yarn.lock
  echo "yarn.lock file was found and has been removed for the purpose of building the tarball. It will be re-generated"
else
  echo "yarn.lock file does not exist."
fi


make rumi-fe
make build

mkdir nvx-rumi-monitor-10.1.1-1/

mkdir nvx-rumi-monitor-10.1.1-1/bin/
cp -r bin/* nvx-rumi-monitor-10.1.1-1/bin/

mkdir nvx-rumi-monitor-10.1.1-1/conf/
cp -r conf/* nvx-rumi-monitor-10.1.1-1/conf/

mkdir nvx-rumi-monitor-10.1.1-1/public/
cp -r public/* nvx-rumi-monitor-10.1.1-1/public/

mkdir nvx-rumi-monitor-10.1.1-1/packaging/
cp -r packaging/* nvx-rumi-monitor-10.1.1-1/packaging/

mkdir nvx-rumi-monitor-10.1.1-1/plugins-bundled/
cp -r plugins-bundled/* nvx-rumi-monitor-10.1.1-1/plugins-bundled/

mkdir nvx-rumi-monitor-10.1.1-1/tools/
cp -r tools/* nvx-rumi-monitor-10.1.1-1/tools/

cp Dockerfile nvx-rumi-monitor-10.1.1-1/Dockerfile
cp LICENSE nvx-rumi-monitor-10.1.1-1/LICENSE
cp NOTICE.md nvx-rumi-monitor-10.1.1-1/NOTICE.md
cp README.md nvx-rumi-monitor-10.1.1-1/README.md
cp BUILD.md nvx-rumi-monitor-10.1.1-1/BUILD.md

tar -czvf nvx-rumi-monitor-10.1.1-1.linux-amd64.tar.gz nvx-rumi-monitor-10.1.1-1/
rm -rf nvx-rumi-monitor-10.1.1-1/

