generate-dev:
	@DOMAIN=assts.site \
	DSN=postgres://kratos:kratos@db-kratos:5432/kratos?sslmode=disable \
	envsubst < infra/kratos/kratos.template.yml > infra/kratos/kratos.yml && \
	DOMAIN=assts.site \
	DSN=postgres://hydra:hydra@db-hydra:5432/hydra?sslmode=disable \
	envsubst < infra/hydra/hydra.template.yml > infra/hydra/hydra.yml && \
	DOMAIN=assts.site \
	envsubst < infra/cloudflared/config.template.yml > infra/cloudflared/config.yml

generate-prod:
	@DOMAIN=acstane.com \
	DSN=postgres://kratos:kratos@db-kratos:5432/kratos?sslmode=disable \
	envsubst < infra/kratos/kratos.template.yml > infra/kratos/kratos.yml && \
	DOMAIN=acstane.com \
	DSN=postgres://hydra:hydra@db-hydra:5432/hydra?sslmode=disable \
	envsubst < infra/hydra/hydra.template.yml > infra/hydra/hydra.yml && \
	DOMAIN=acstane.com \
	envsubst < infra/cloudflared/config.template.yml > infra/cloudflared/config.yml

dev: generate-dev
	docker compose -f infra/docker-compose.yml -f infra/docker-compose.override.yml up -d

prod: generate-prod
	docker compose -f infra/docker-compose.yml up -d

down-dev:
	docker compose -f infra/docker-compose.yml -f infra/docker-compose.override.yml down

down-prod:
	docker compose -f infra/docker-compose.yml down

restart-dev: down-dev dev
restart-prod: down-prod prod

rebuild:
	docker compose -f infra/docker-compose.yml -f infra/docker-compose.override.yml build $(s)
	docker compose -f infra/docker-compose.yml -f infra/docker-compose.override.yml up -d $(s)

lint:
	cd ../
	pnpm eslint "**/*.{ts,tsx,js,jsx}" --fix
	pnpm prettier --write "**/*.{ts,tsx,js,jsx,json,yml}" | grep -v '(unchanged)' || true
