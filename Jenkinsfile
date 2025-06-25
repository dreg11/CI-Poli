pipeline {
  agent any

  stages {

    stage('Clonar código') {
      steps {
        git 'https://github.com/dreg11/CI-Poli.git'
      }
    }

    stage('Verificar archivos en contenedor') {
      steps {
        dir('backend') {
          sh '''
            echo "[Host] Contenido actual en backend:"
            ls -l

            echo "[Contenedor] Contenido montado en /app:"
            docker run --rm \
              -v "$(pwd):/app" \
              -w /app \
              node:18 \
              bash -c '
                echo "Contenido en /app:"
                ls -l /app

                echo ""
                if [ -f /app/package.json ]; then
                  echo "[OK] package.json encontrado"
                  cat /app/package.json
                else
                  echo "[ERROR] package.json NO encontrado en el contenedor"
                  exit 1
                fi
              '
          '''
        }
      }
    }

    stage('Instalar dependencias') {
      steps {
        dir('backend') {
          sh '''
            echo "[Instalando dependencias en contenedor Docker]"
            docker run --rm \
              -v "$(pwd):/app" \
              -w /app \
              node:18 \
              bash -c "
                if [ -f /app/package.json ]; then
                  npm install
                else
                  echo '[ERROR] No se encontró package.json, cancelando instalación.'
                  exit 1
                fi
              "
          '''
        }
      }
    }

    stage('Ejecutar pruebas') {
      steps {
        dir('backend') {
          sh '''
            echo "[Ejecutando pruebas en contenedor Docker]"
            docker run --rm \
              -v "$(pwd):/app" \
              -w /app \
              node:18 \
              bash -c "
                if [ -f /app/package.json ]; then
                  npm test || echo '[ADVERTENCIA] Pruebas fallaron'
                else
                  echo '[ERROR] No se encontró package.json, no se ejecutan pruebas.'
                  exit 1
                fi
              "
          '''
        }
      }
    }

    stage('Construir imagen Docker') {
      steps {
        echo "[Construyendo imagen Docker del backend]"
        sh 'docker build -t ci-backend ./backend'
      }
    }
  }
}
