#!/bin/sh
set -e

doppler run -- sh -c '
  envsubst < /etc/traefik/dynamic.tpl.yml > /etc/traefik/dynamic.yml
  echo "$ACSTANE_TLS_CERT" > /certs/acstane.pem
  echo "$ACSTANE_TLS_KEY" > /certs/acstane-key.pem
'

exec traefik "$@"