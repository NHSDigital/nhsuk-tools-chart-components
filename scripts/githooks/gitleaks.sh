#!/bin/bash

# navigate to current directory relative to this script and then up two levels to the root of the repo
posix_parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; cd "../.." ; pwd -P ;  )
cd "$posix_parent_path"

# convert path from POSIX to windows if on windows OS, otherwise use POSIX path for linux/MAC
volume_mount_path="${posix_parent_path}"

wsl_docker=0

if ! command -v docker
then
  wsl_docker=1
fi

if [ $wsl_docker = 1 ]
then
  volume_mount_path="//mnt${volume_mount_path}"
elif [[ "$OSTYPE" =~ ^msys ]]
then
  volume_mount_path=$(echo "$posix_parent_path" | sed -e 's/^\///' -e 's/\//\\/g' -e 's/^./\0:/')
fi

echo "Running gitleaks in: ${volume_mount_path}"

if [ $wsl_docker = 1 ]
then
  wsl docker pull zricethezav/gitleaks:latest
  wsl docker run --rm -v "${volume_mount_path}:/scan-path" zricethezav/gitleaks:latest detect -s "./scan-path" --redact -r "./scan-path/gitleaks-report.json" -f "json"
else
  docker pull zricethezav/gitleaks:latest
  docker run --rm -v "${volume_mount_path}:/scan-path" zricethezav/gitleaks:latest detect -s "./scan-path" --redact -r "./scan-path/gitleaks-report.json" -f "json"
fi
