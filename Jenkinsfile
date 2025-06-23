pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '5', daysToKeepStr: '5'))
    }

    stages {
        stage('Clean up') {
            steps {
                deleteDir()
                sh 'docker system prune -af'
            }
        }

        stage('Validate PR') {
            when {
                allOf {
                    changeRequest()
                    expression { env.CHANGE_TARGET == 'main' }
                }
            }
            stages {
                stage('Build frontend') {
                    agent {
                        docker {
                            image 'node:20'
                            args '-v /var/jenkins_cache/npm:/home/node/.npm -v /host-vedad:/host-vedad'
                        }
                    }
                    steps {
                        sh 'cp .env.production .'
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                allOf {
                    branch 'main'
                    not { changeRequest() }
                }
            }
            stages {
                stage('Build frontend') {
                    agent {
                        docker {
                            image 'node:20'
                            args '-v /var/jenkins_cache/npm:/home/node/.npm -v /host-vedad:/host-vedad'
                        }
                    }

                    steps {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
                stage('Build and push docker image') {
                    agent any
                    environment {
                        SHORT_SHA = "${env.GIT_COMMIT.take(7)}"
                    }
                    steps {
                        echo 'Building docker image'
                        withCredentials([
                            usernamePassword(
                                credentialsId: 'docker-registry',
                                usernameVariable: 'DOCKER_USER',
                                passwordVariable: 'DOCKER_PASS'
                            )
                        ]) {
                            sh '''
                                echo "$DOCKER_PASS" | \
                                docker login registry.praksa.abhapp.com \
                                    --username "$DOCKER_USER" --password-stdin

                                docker build -t registry.praksa.abhapp.com/vedad-fe:$SHORT_SHA .
                                docker push registry.praksa.abhapp.com/vedad-fe:$SHORT_SHA
                            '''
                        }
                    }
                }

                stage('Deploy app') {
                    agent any
                    environment {
                        PATH = "/usr/local/bin:${env.PATH}"
                    }
                    steps {
                        checkout scm

                        script {
                            def shortCommit = env.GIT_COMMIT.take(7)

                            withCredentials([
                                usernamePassword(
                                    credentialsId: 'docker-registry',
                                    usernameVariable: 'DOCKER_USER',
                                    passwordVariable: 'DOCKER_PASS'
                                )
                            ])  {
                                writeFile file: '.env', text: "TAG=\"${shortCommit}\"\n"
                                sh """
                                echo "$DOCKER_PASS" | docker login registry.praksa.abhapp.com \
                                    --username "$DOCKER_USER" --password-stdin

                                docker compose -f docker-compose-vedadfe.yml pull
                                docker compose -f docker-compose-vedadfe.yml up -d
                            """
                            }
                        }
                    }
                }
            }
        }
    }
}
