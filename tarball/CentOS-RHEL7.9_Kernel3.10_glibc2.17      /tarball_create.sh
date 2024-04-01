#!/bin/bash

export CGO_ENABLED=1
make deps
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

