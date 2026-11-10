Levanta solo Postgres usando tu docker-compose.yml (que sí tiene ports: "5432:5432"):
bash

docker compose up -d postgres

-------------------------------------------------
Mira qué contenedores existen ahora:
bash

docker ps -a
Localiza el de Postgres (imagen postgres:16-alpine) y copia su NOMBRE o ID.

Saca la IP con ese nombre/ID (ejemplo usando el nombre que te salga en NAMES):

bash

docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' NOMBRE_DEL_CONTENEDOR_POSTGRES

---------------------------------------------------
ejecutar  todo los  servicios de  docker compose.yml
sudo docker compose up --build
------------------------------------------------------------
ver las  redes 

sudo docker network ls

----------------------------- 
ver todos los  volumes

sudo docker volume ls

----------------------------


