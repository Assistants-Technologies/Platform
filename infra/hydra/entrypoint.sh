#!/usr/bin/env bash
set -euo pipefail

doppler run -- bash -c "envsubst < /etc/config/hydra.tpl.yml > /etc/config/hydra.yml"

hydra migrate sql --yes "$DSN" || true

hydra serve all --config /etc/config/hydra.yml "$@" &
HYDRA_PID=$!

MAX_RETRIES=20
SLEEP_TIME=5
for i in $(seq 1 $MAX_RETRIES); do
    if curl -s http://hydra:4445/health/alive >/dev/null 2>&1; then
        echo "Hydra Admin API is up!"
        break
    fi
    echo "Waiting for Hydra Admin API ($i/$MAX_RETRIES)..."
    sleep $SLEEP_TIME
    if [ "$i" -eq "$MAX_RETRIES" ]; then
        echo "ERROR: Hydra Admin API not reachable after $MAX_RETRIES attempts."
        kill $HYDRA_PID
        exit 1
    fi
done

doppler run -- bash -c '
CLIENT_ID="${HYDRA_ACSTANE_CLIENT_ID}"
CLIENT_SECRET="${HYDRA_ACSTANE_CLIENT_SECRET}"
REDIRECT_URI="https://id.${ACSTANE_DOMAIN}/"
HYDRA_ENDPOINT="http://hydra:4445"

CLIENT_EXISTS=$(hydra get oauth2-client "$CLIENT_ID" --endpoint "$HYDRA_ENDPOINT" --format json 2>/dev/null || echo "{}")
if [ "$(echo "$CLIENT_EXISTS" | jq -r ".client_id // empty")" = "" ]; then
    echo "Client $CLIENT_ID does not exist, creating..."
    hydra create oauth2-client \
        --id "$CLIENT_ID" \
        --name "Discord Dashboard" \
        --secret "$CLIENT_SECRET" \
        --redirect-uri "$REDIRECT_URI" \
        --grant-type authorization_code \
        --skip-consent \
        --skip-logout-consent \
        --grant-type refresh_token \
        --response-type code \
        --scope openid,offline,profile,email,metrics:discord-dashboard \
        --audience api://discord-dashboard,api://metrics,api://store,api://store/connect \
        --token-endpoint-auth-method client_secret_post \
        --endpoint "$HYDRA_ENDPOINT" \
        --format json \
        --quiet || echo "Client creation failed but continuing..."
else
    echo "Client $CLIENT_ID already exists, skipping creation."
fi
'

wait $HYDRA_PID