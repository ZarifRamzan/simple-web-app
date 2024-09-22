pipeline {
    agent any

    // Define parameters
    parameters {
        choice(
            name: 'USER',
            choices: ['admin:admin', 'zarif:zarif'],
            description: 'Select a user with credentials'
        )
    }

    stages {
        stage('Print Selected User') {
            steps {
                script {
                    def selectedUser = params.USER.split(':')[0] // Extract the username from the choice
                    def selectedPassword = params.USER.split(':')[1] // Extract the password from the choice

                    // Print out selected user and password (for demo purposes)
                    echo "Selected User: ${selectedUser}"
                    echo "Selected Password: ${selectedPassword}"

                    // For real scenarios, you may want to use these credentials securely in your scripts
                }
            }
        }

        stage('Use Selected User') {
            steps {
                // Example of how you can use the selected user in the pipeline
                echo "Running the build as ${params.USER}"
                // Add further steps to authenticate or use this user in your pipeline logic
            }
        }
    }

    post {
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}

