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
          sh 'docker run --rm -v "$(pwd)":/app -w /app node:18 bash -c "npm install"'
        }
      }
    }

    stage('Ejecutar pruebas') {
      steps {
        dir('backend') {
          sh 'docker run --rm -v "$(pwd)":/app -w /app node:18 bash -c "npm test"'
        }
      }
    }

    stage('Construir imagen Docker') {
      steps {
        sh 'docker build -t ci-backend ./backend'
      }
    }
  }
}


