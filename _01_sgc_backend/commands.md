# _01_sgc_backend — Commands

Quick reference for the Bun + PostgreSQL backend (`sgc_backend` + `SGC_postgres`, DB `sgc_db`, port `4001`).

---

## Docker Compose lifecycle

```bash
# Start everything in background (build backend, start DB, wait for healthy)
docker compose up -d --build

# Status / running containers
docker compose ps
docker ps

# View all containers (including stopped)
docker ps -a

# Logs (backend)
docker compose logs -f sgc_backend

# Logs (DB)
docker compose logs -f SGC_postgres

# Restart a specific service
docker compose restart sgc_backend
```

---

## Stop & Clean Containers

```bash
# 1. Stop only project containers (graceful stop; keeps containers and volume)
docker compose stop

# 2. Stop ALL running containers on the system (Docker host)
docker stop $(docker ps -q)
# Safe version (avoids error when no containers are running):
docker ps -q | xargs -r docker stop

# 3. Force-kill ALL running containers on the system
docker ps -q | xargs -r docker kill

# 4. Stop and remove project containers & network (preserves volume `SGC_postgres_data`)
docker compose down

# 5. Stop and drop named volume (resets DB to init script)
docker compose down -v

# 6. Remove stopped containers / unused resources
docker container prune -f
```

---

## Run locally (Bun)

```bash
# Dependencies (once)
bun install

# Run backend with hot reload (listens on port 4001)
bun --watch src/index.ts

# Run with custom environment variables
PORT=4001 DB_HOST=localhost DB_PORT=5432 DB_USER=admin DB_PASSWORD=admin123 DB_NAME=sgc_db bun --watch src/index.ts
```

---

## Build / test (local)

```bash
# 1. Run unit tests only (fast, no DB or server required)
bun test ./test/create-usuario-handler.test.ts
# or via npm script:
bun run test:unit

# 2. Run API integration tests (requires backend running on http://localhost:4001)
bun test ./test/usuarios.backend.api.test.ts
# or via npm script:
bun run test:api

# 3. Run all tests via runner script
bun run test:all

# 4. Build bundle (verifies bundling; --external pg if pg is not installed in local node_modules)
bun build ./src/index.ts --outdir ./dist --target bun --external pg
```

---

## DB access (`sgc_db`, user `admin`)

```bash
# Open interactive psql inside the running DB container
docker compose exec -it SGC_postgres psql -U admin -d sgc_db

# Run init schema manually (only when data dir is empty; compose mounts it at init)
docker compose exec -T SGC_postgres psql -U admin -d sgc_db < ./db/init/01-schema.sql
```

Inside `psql`:

```sql
\dt
SELECT * FROM usuario;
```

---

## Health / API checks (port 4001)

```bash
# Health endpoint
curl -s http://localhost:4001/health | head -c 200

# List users
curl -s http://localhost:4001/usuarios | head -c 200

# Create user (201 expected)
curl -X POST http://localhost:4001/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ana","email":"ana@test.com"}'

# Update user (1)
curl -X PUT http://localhost:4001/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ana Updated","email":"ana.updated@test.com"}'

# Delete user (e.g., 2)
curl -X DELETE http://localhost:4001/usuarios/2

# Unknown route -> 404
curl -w "\n%{http_code}\n" -o /dev/null -s http://localhost:4001/unknown
```

---

## Inspect / debug

```bash
# Networks
docker network ls

# Volumes
docker volume ls

# Inspect DB service IP inside the Docker network
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker compose ps -q SGC_postgres)

# Inspect backend service IP
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker compose ps -q sgc_backend)
```
