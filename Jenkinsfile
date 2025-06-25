pipeline {
  agent any

  stages {
    stage('Clonar código') {
      steps {
        git 'https://github.com/dreg11/CI-Poli.git'
      }
    }

    stage('Instalar dependencias') {
      steps {
        dir('backend') {
          sh '''
            echo "[INFO] Contenido de la carpeta backend antes de instalar dependencias:"
            ls -l

            echo "[INFO] Mostrando package.json:"
            cat package.json || echo "No se encontró package.json"

            echo "[INFO] Ejecutando npm install dentro del contenedor..."
            docker run --rm \
              -v "$(pwd):/app" \
              -w /app \
              node:18 \
              bash -c "npm install"
          '''
        }
      }
    }

    stage('Ejecutar pruebas') {
      steps {
        dir('backend') {
          sh '''
            echo "[INFO] Ejecutando pruebas unitarias con npm test..."
            docker run --rm \
              -v "$(pwd):/app" \
              -w /app \
              node:18 \
              bash -c "npm test"
          '''
        }
      }
    }

    stage('Construir imagen Docker') {
      steps {
        echo "[INFO] Construyendo imagen Docker del backend..."
        sh 'docker build -t ci-backend ./backend'
      }
    }
  }
}
