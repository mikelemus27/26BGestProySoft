# _01_sgc_backend — Commands

Quick reference for the Bun + PostgreSQL backend (`sgc_backend` + `SGC_postgres`, DB `sgc_db`).

---

## Docker Compose lifecycle

```bash
# Start everything (build backend, start DB, wait for healthy)
docker compose up -d --build

# Status / containers
docker compose ps
docker ps -a

# Logs (backend)
docker compose logs -f sgc_backend

# Logs (DB)
docker compose logs -f SGC_postgres

# Stop and remove services/containers/network (keep volume `SGC_postgres_data`)
docker compose down

# Stop and also drop named volume (resets DB to init script)
docker compose down -v
```

---

## Build / test (local, no Docker)

```bash
# Dependencies (once)
bun install

# Run tests
bun test
bun test ./test/create-usuario-handler.test.ts

# Build (verify bundling; `pg` may require install for full build test)
bun build ./src/index.ts --outdir ./dist
```

---

## DB access (`sgc_db`, user `admin`)

```bash
# Open psql inside the running DB container
docker exec -it $(docker compose ps -q SGC_postgres) psql -U admin -d sgc_db

# Run init schema manually (only when data dir is empty; compose mounts it at init)
docker exec -i $(docker compose ps -q SGC_postgres) psql -U admin -d sgc_db < ./db/init/01-schema.sql
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

# Inspect DB service IP
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker compose ps -q SGC_postgres)

# View compose file path
pwd
```

---

## Clean stop (only containers; keeps volume and DB)

```bash
docker compose stop
```
