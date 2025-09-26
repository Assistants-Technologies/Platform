#!/bin/sh
doppler run -- sh -c "envsubst < /etc/config/kratos.tpl.yml > /etc/config/kratos.yml"

kratos migrate sql --yes $DSN || true

exec kratos serve all --config /etc/config/kratos.yml "$@"