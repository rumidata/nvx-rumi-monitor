## Build Docker Image from Source

1. Download the tarball by running the following command on your Ubuntu server:
   ```shell
   wget https://dl.grafana.com/enterprise/release/grafana-enterprise-10.4.0.linux-amd64.tar.gz

2. Modify the GRAFANA_TGZ build an argument in your Dockerfile:

```shell
ARG GRAFANA_TGZ="grafana-enterprise-10.4.0.linux-amd64.tar.gz"
```

3. Build the docker image using the command:

```shell
docker build -t neeve/nvx-rumi-monitor:latest .
docker tag neeve/nvx-rumi-monitor:latest neeve/nvx-rumi-monitor:latest
```

4. Login to DockerHub and push the image:

```shell
docker login
docker push neeve/nvx-rumi-monitor:latest
```

# Custom Grafana Fork Management

## Starting with a Fork

1. **Fork Grafana**: Fork the Grafana repository on GitHub to your own account or organization.

2. **Clone Your Fork**: Clone your fork to your local development environment.

3. **Create a Custom Branch**: Instead of working directly on the `release-10.1.1` branch (or any other Grafana release branch), create a new branch from it for your custom work. This keeps your changes isolated and makes it easier to manage updates from the upstream Grafana repository.
    ```bash
    git checkout -b rumi-monitor-release-10.1.1 release-10.1.1
    ```

## Merging Updates from Upstream

1. **Add the Grafana Repository as a Remote**: If you haven't already, add the original Grafana repository as a remote source. This allows you to fetch updates.
    ```bash
    git remote add upstream https://github.com/grafana/grafana.git
    ```

2. **Fetch Updates**: Fetch the updates from the Grafana repository.
    ```bash
    git fetch upstream
    ```

3. **Merge the Updates**: Merge the updates into your custom branch. Make sure you're on your custom branch and then merge the changes from the Grafana release branch (e.g., `release-10.1.1`).
    ```bash
    git checkout rumi-monitor-release-10.1.1
    git merge upstream/release-10.1.1
    ```

4. **Resolve Conflicts**: If there are any merge conflicts between your changes and the updates from Grafana, you'll need to resolve them manually. After resolving any conflicts, commit the changes.

## Upgrading to a New Grafana Branch

1. **Create a New Custom Branch**: Create a new branch from the Grafana branch you want to upgrade to.
    ```bash
    git fetch upstream
    git checkout -b rumi-monitor-release-11.0.0 upstream/release-11.0.0
    ```

2. **Cherry-Pick or Merge Your Changes**: Depending on your customizations and the base Grafana code changes, you may choose to cherry-pick individual commits from your old custom branch to the new one or attempt to merge the entire branch. Cherry-picking is safer but more tedious, while merging is faster but may result in more conflicts.
  - **Cherry-Pick**:
      ```bash
      git cherry-pick <commit-hash>
      ```
  - **Merge**:
      ```bash
      git merge rumi-monitor-release-10.1.1
      ```

3. **Test Thoroughly**: After merging or cherry-picking your changes, thoroughly test your Grafana instance to ensure that your customizations work as expected with the new Grafana base version.

4. **Resolve Any Issues**: If you encounter issues, you may need to adjust your custom code to be compatible with the new Grafana version.

By following this approach, you can maintain a custom version of Grafana while still being able to incorporate upstream updates and switch to new versions as they are released. Remember, regular communication with your development team and careful testing at each step are key to managing your custom fork effectively.
