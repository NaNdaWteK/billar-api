#!/bin/sh



docker run \
  --name=filebeat \
  --user=root \
  --volume="$(pwd)/filebeat.docker.yml:/usr/share/filebeat/filebeat.yml:ro" \
  --volume="$(pwd)/logs:/var/lib/docker/containers/logs" \
  docker.elastic.co/beats/filebeat:8.6.1 filebeat -e --strict.perms=false


