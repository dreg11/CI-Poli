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
            echo "[Host] Contenido actual en el backend:"
            ls -l

            echo "[Contenedor] Contenido montado en /app:"
            docker run --rm \
              -v "$(pwd):/app" \
              -w /app \
              node:18 \
              bash -c '
                echo "Archivos en /app:"
                ls -l /app || echo "No se pudo listar /app"

                echo ""
                echo "Contenido de package.json:"
                if [ -f /app/package.json ]; then
                  cat /app/package.json
                else
                  echo "ERROR: package.json NO encontrado dentro del contenedor"
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
            echo "[Instalación de dependencias en contenedor Docker]"
            docker run --rm \
              -v "$(pwd):/app" \
              -w /app \
              node:18 \
              bash -c '
                if [ -f /app/package.json ]; then
                  npm install
                else
                  echo "ERROR: No se encontró package.json. Cancelando instalación."
                  exit 1
                fi
              '
          '''
        }
      }
    }

    stage('Ejecutar pruebas') {
      steps {
        dir('backend') {
          sh '''
            echo "[Ejecución de pruebas en contenedor Docker]"
            docker run --rm \
              -v "$(pwd):/app" \
              -w /app \
              node:18 \
              bash -c '
                if [ -f /app/package.json ]; then
                  npm test
                else
                  echo "ERROR: No se encontró package.json. No se pueden ejecutar pruebas."
                  exit 1
                fi
              '
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

