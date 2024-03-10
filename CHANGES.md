# Changes Made for Rumi Monitor

We created the `rumi-monitor-release-10.1.1` branch with using the base branch `release-10.1.1` and added or made changes to the following files:

## BUILD.md

The document provides instructions for building a Docker image from the Grafana Enterprise source code and for managing a custom Grafana fork. The key points are:

- Building a Docker image:
  - Download the Grafana Enterprise tarball
  - Modify the Dockerfile to use the downloaded tarball
  - Build and tag the Docker image
  - Push the image to DockerHub

- Managing a custom Grafana fork:
  - Fork the Grafana repository on GitHub
  - Clone your fork and create a custom branch
  - Merge updates from the upstream Grafana repository into your custom branch
  - When upgrading to a new Grafana version, create a new custom branch and either cherry-pick or merge your changes

- Building a Grafana tarball from source:
  - Set up the required environment (NodeJS, npm, yarn, Golang)
  - Run a script to create the tarball
  - Extract the tarball and run the Grafana server

The document provides a comprehensive guide for managing a custom Grafana deployment, including building Docker images, maintaining a fork, and creating tarballs from the source code.


## Dockerfile

### Dockerfile Overview

The Dockerfile does the following:

1. Builds the Grafana image in multiple stages, using various base images and building the Go and JavaScript components separately.
2. Assembles the final Docker image, copying in the necessary files and configuring the environment for running Grafana.

### Changes Made

1. Commented out the code that would install the `bingo` tool, as it seems you already have it installed.

```dockerfile
# RUN if [[ "$BINGO" = "true" ]]; then \
#      go install github.com/bwplotka/bingo@latest && \
#      bingo get -v; \
#    fi
```

2. Added three new sections:
  - The first section removes the default dashboards and the Grafana configuration file from the image.

```dockerfile
# custom packaging for docker image
RUN rm -rf /usr/share/grafana/public/dashboards/*
RUN rm /etc/grafana/grafana.ini
```

- The second section copies a custom `grafana.ini` configuration file into the image.

```dockerfile
COPY conf/grafana.ini /etc/grafana/grafana.ini
```

- The third section copies custom dashboard and data source provisioning files into the image.

```dockerfile
COPY conf/provisioning/dashboards/dashboards.yaml /etc/grafana/provisioning/dashboards/
COPY conf/provisioning/datasources/lumino-datasource.yaml /etc/grafana/provisioning/datasources/
```

These changes made to customizing the Grafana installation within the Docker image, for using specific configuration and set of dashboards/data sources that are tailored for Rumi monitor.

## Dashboards and InfluxDB Data-source


```shell
- conf/
    ├── defaults.ini
    ├── grafana.ini
    ├── provisioning
    │   ├── dashboards
    │   │   ├── System
    │   │   │   ├── host.json
    │   │   │   ├── service.json
    │   │   │   └── vm.json
    │   │   ├── dashboards.yaml
    │   ├── datasources
    │   │   ├── lumino-datasource.yaml
```

## Branding

Changes are made for the UI to ensure the branding for the Rumi Monitor and the file changes are provided below-

```shell
- public/
    └── app
        └── core
            └── components
                └── Branding
                    └── Branding.tsx

- public/
    └── img
        ├── Rumi_Blue.svg
        ├── Rumi_White.svg
        ├── Rumi_Yellow.png
        └── Rumi_Yellow.svg
```

## TarBall Environment Setup and Creation

```shell
-  tarball/
   ├── tarball_create.sh
   └── tarball_env_setup.sh
```


## Placement of the artifacts in the Tarball

The Tarball directory structure is provided below:

```shell
$ tree nvx-rumi-monitor-10.1.1-1 -L 1

   ├── BUILD.md
   ├── Dockerfile
   ├── LICENSE
   ├── NOTICE.md
   ├── README.md
   ├── bin
   ├── conf
   ├── packaging
   ├── plugins-bundled
   ├── public
   └── tools
```

We don't make any changes in the directories below and those are copied directly after
the build of the project:

```shell
   ├── packaging
   ├── plugins-bundled
   └── tools
```

We have copied the other directories from the source folder using the shell script provided in the ```tarball/tarball_create.sh``` 
directory. 


