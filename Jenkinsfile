pipeline {
    agent any

    stages {
        stage('Clonar repositorio') {
            steps {
                echo 'Repositorio clonado automáticamente por Jenkins.'
            }
        }

        stage('Construir imagen de pruebas') {
            steps {
                dir('backend') {
                    script {
                        docker.build("backend-test", "-f Dockerfile.test .")
                    }
                }
            }
        }

        stage('Ejecutar pruebas') {
            steps {
                script {
                    docker.image('backend-test').run('--rm')
                }
            }
        }
    }

    post {
        success {
            echo '✅ Las pruebas pasaron correctamente.'
        }
        failure {
            echo '❌ Las pruebas fallaron. Revisa el código.'
        }
    }
}
