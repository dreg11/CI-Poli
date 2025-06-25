# CI‑Poli 🔁

Proyecto de ejemplo de integración continua (CI) para un **backend en Node.js** con SQLite y **frontend**, 
usando Docker Compose, Jest, Codecov, Jenkins y GitHub Actions.

---

## 🧱 Estructura del proyecto
CI‑Poli/
- backend/
index.js # servidor Express + SQLite
db/database.js # configuración de base de datos
tests/ # prueba con Jest + Supertest
package.json # scripts y dependencias
│Dockerfile
- frontend/
# código frontend
 Dockerfile
docker-compose.yml # orquesta backend + frontend
Jenkinsfile # CI Pipeline (Jenkins)
.github/
workflows/
codecov.yml # CI Pipeline (GitHub Actions)


---

## 🛠️ Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Jenkins](https://www.jenkins.io/) (con plugin Docker Pipeline)
- [GitHub](https://github.com/) con acceso al repo `dreg11/CI‑Poli`
- (Opcional) [Codecov](https://app.codecov.io/) para visualización de cobertura

---

## 🚀 Levantar local con Docker Compose

```bash
docker-compose down --volumes
docker-compose build --no-cache
docker-compose up -d

📌 El backend estará en http://localhost:3001
📌 El frontend en http://localhost:3000

GitHub Actions
En .github/workflows/codecov.yml, el workflow:

Instala Node 20

Ejecuta pruebas y cobertura

Subida a Codecov usando codecov-action@v4

Si el repo es privado, añade el secret CODECOV_TOKEN en GitHub.

📦 Despliegue y mantenimiento
Para cambios en backend/frontend, solo ejecuta docker-compose up.

Jenkins corre automáticamente en contenedor con el pipeline.

GitHub Actions valida todo ante cada push o PR.
