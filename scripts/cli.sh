#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

COMPOSE="docker compose --env-file ../.env \
  -f ../infrastructure/stacks/dev/docker-compose.yml \
  -f ../services/identity/docker-compose.kratos.yaml \
  -f ../services/authorization/docker-compose.hydra.yaml"

CMD="${1:-up}"
shift || true

case "$CMD" in
  up)
    echo "🔹 Starting ORY dev stack..."
    $COMPOSE up -d "$@"
    ;;
  down)
    echo "🔹 Stopping ORY dev stack..."
    $COMPOSE down "$@"
    ;;
  restart)
    echo "🔹 Restarting ORY dev stack..."
    $COMPOSE down "$@"
    $COMPOSE up -d "$@"
    ;;
  logs)
    echo "🔹 Showing logs..."
    $COMPOSE logs -f "$@"
    ;;
  *)
    echo "Usage: $0 {up|down|restart|logs} [extra docker-compose args]"
    echo "Examples:"
    echo "  $0 up --build"
    echo "  $0 restart --build --remove-orphans"
    echo "  $0 down -v"
    exit 1
    ;;
esac