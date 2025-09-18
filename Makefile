generate-dev:
	@DOMAIN=assts.site SUBDOMAIN_IDP=idp SUBDOMAIN_OIDC=oidc \
	DSN=postgres://kratos:kratos@db-kratos:5432/kratos?sslmode=disable \
	envsubst < infra/kratos/kratos.template.yml > infra/kratos/kratos.yml && \
	DOMAIN=assts.site SUBDOMAIN_IDP=idp SUBDOMAIN_OIDC=oidc \
	DSN=postgres://hydra:hydra@db-hydra:5432/hydra?sslmode=disable \
	envsubst < infra/hydra/hydra.template.yml > infra/hydra/hydra.yml

generate-prod:
	@DOMAIN=acstane.com SUBDOMAIN_IDP=idp SUBDOMAIN_OIDC=oidc \
	DSN=postgres://kratos:kratos@db-kratos:5432/kratos?sslmode=disable \
	envsubst < infra/kratos/kratos.template.yml > infra/kratos/kratos.yml && \
	DOMAIN=acstane.com SUBDOMAIN_IDP=idp SUBDOMAIN_OIDC=oidc \
	DSN=postgres://hydra:hydra@db-hydra:5432/hydra?sslmode=disable \
	envsubst < infra/hydra/hydra.template.yml > infra/hydra/hydra.yml

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
