pipeline {
  agent any

  stages {
    stage('Clonar repositorio') {
      steps {
        git 'https://github.com/dreg11/CI-Poli.git'
      }
    }

    stage('Verificar archivos') {
      steps {
        sh '''
          echo "[Host] Archivos disponibles en Jenkins:"
          ls -R
          echo ""
        '''
      }
    }

    stage('Verificar backend') {
      steps {
        dir('backend') {
          sh '''
            echo "[Host] Archivos en backend:"
            ls -l
            if [ ! -f package.json ]; then
              echo "[ERROR] No se encontró package.json en el host"
              exit 1
            fi
          '''
        }
      }
    }

    stage('Instalar dependencias') {
      steps {
        dir('backend') {
          sh '''
            echo "[Contenedor] Instalando dependencias..."
            docker run --rm -v "$(pwd):/app" -w /app node:18 bash -c '
              echo "Contenido de /app:"
              ls -l /app
              if [ -f /app/package.json ]; then
                npm install
              else
                echo "[ERROR] No se encontró package.json dentro del contenedor"
                exit 1
              fi
            '
          '''
        }
      }
    }
  }
}
