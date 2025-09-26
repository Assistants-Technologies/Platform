dev: 
	docker compose -f infra/docker-compose.yml -f infra/docker-compose.override.yml up -d

prod: 
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
