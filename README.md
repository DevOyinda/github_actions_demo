

# GITHUB-ACTIONS-DEMO
# CI/CD with Node.js, and GitHub Actions

This project demonstrates the setup of Continuous Integration and Continuous Deployment (CI/CD) pipelines using **GitHub Actions**. The goal of this project is to implement a Continuous Integration (CI) and Continuous Deployment (CD) pipeline using GitHub Actions for a Node.js application. This ensures that the code is automatically tested, built, and deployed when changes are made to the main branch or pull requests are created.


## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Linters and Static Code Analysis](#linters-and-static-code-analysis)
- [Matrix Builds](#matrix-builds)
- [Versioning, Tags, and Releases](#Versionin-Tag-and-Releases)
- [Deploying to EC2 on AWS](#Deploying-to-EC2-on-AWS)
- [Setting Up Secrets and Access Tokens](#Setting-Up-Secrets-and-Access-Tokens)

## Project Overview/Objective
This project aims to set up a Continuous Integration (CI) and Continuous Deployment (CD) pipeline using GitHub Actions for a Node.js application. The goal is to automate the processes of dependency installation, building, and testing, ensuring that code changes are continuously integrated and tested in multiple environments.

The CI/CD pipeline will:

Ensure that the application is built and tested against multiple Node.js versions (14.x and 16.x).
Provide immediate feedback in the form of automated tests to ensure the quality of the code.
Allow the project to scale with multiple environments without manual intervention.

## Technologies Used

- **Node.js**: JavaScript runtime used for server-side development.
- **Express**: Web framework used in the Node.js application.
- **Docker**: Platform for developing, shipping, and running applications in containers.
- **GitHub Actions**: Automation tool for continuous integration and delivery (CI/CD).
- **npm**: Node.js package manager for dependency management.

## Setup and Installation

To set up this project locally, follow the steps below:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/your-repository-name.git
   cd your-repository-name


2. Creating the `node.js` File

The `node.js` file serves as the entry point for your Node.js application. This file sets up an Express server that listens on port 3000 and responds with a simple "Hello World!" message when accessed at the root URL.

#### Steps to Create `node.js`:
1. Create a file named `node.js` in your project directory.
2. Add the following code to set up the server:

```bash
const express = require('express'); // Import express
const app = express(); // Create an instance of express

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!'); // Respond with "Hello World!" when accessing the root URL
});

// Set the server to listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

3. Running the Application Locally
To run your Node.js application locally, follow these steps:

Open a terminal/command prompt and navigate to the directory where your index.js file is located.
Run the application with the following command:
```bash
node node.js
```
* Open a web browser and visit http://localhost:3000 to see the "Hello World!" message.

4. Creating the package.json File
The package.json file is an essential part of any Node.js project. It contains metadata about the project and is used for managing dependencies, scripts, and other configurations. Here’s how the package.json file was created for this project:

* Creating the package.json Using npm init
To create the package.json file, I used the npm init command. This command prompted me with a series of questions, including the project’s name, version, entry point file (usually index.js), and author information. Here's a breakdown of the command:

```bash
npm init
```


5. Setting Up GitHub Actions with .github/workflows/main.yml
To automate the CI/CD pipeline, you created a GitHub Actions workflow file located in .github/workflows/main.yml. This file defines the automated steps to run tests and build the application on GitHub whenever changes are pushed to the repository.

Steps to Create the GitHub Actions Workflow:
In your project directory, create the .github/workflows folder:
```bash
# Example: .github/workflows/node.js.yml

# Name of the workflow
name: Node.js CI

# Specifies when the workflow should be triggered
on:
  # Triggers the workflow on 'push' events to the 'main' branch
  push:
    branches: [ main ]
  # Also triggers the workflow on 'pull_request' events targeting the 'main' branch
  pull_request:
    branches: [ main ]

# Defines the jobs that the workflow will execute
jobs:
  build:
    runs-on: ubuntu-latest

    # Strategy for running the jobs - this section is useful for testing across multiple environments
    strategy:
      # A matrix build strategy to test against multiple versions of Node.js
      matrix:
        node-version: [16.x]

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - # Checks-out your repository under $GITHUB_WORKSPACE, so the job can access it
        uses: actions/checkout@v2

      - # Sets up the specified version of Node.js
        name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - # Installs node modules as specified in the project's package-lock.json
        run: npm ci

      - # This command will only run if a build script is defined in the package.json
        run: npm run build --if-present

      - # Runs tests as defined in the project's package.json
        run: npm test
```

- **Linters and Static Code Analysis**: 
  - Configured ESLint to enforce code quality and styling rules.
  - Static code analysis ensures that the code adheres to best practices by identifying issues such as unused variables and improper formatting.
  - ESLint is configured to follow best practices, including enforcing double quotes for strings, disallowing unused variables, and warning on console usage.

- **Matrix Builds**: 
  - Implemented matrix builds to test the code across multiple environments.
  - This allows the code to be validated against different versions of Node.js, ensuring compatibility and stability across environments.

```bash
# Name of the workflow
name: Node.js CI

# Specifies when the workflow should be triggered
on:
  # Triggers the workflow on 'push' events to the 'main' branch
  push:
    branches: [ main ]
  # Also triggers the workflow on 'pull_request' events targeting the 'main' branch
  pull_request:
    branches: [ main ]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: false


# Defines the jobs that the workflow will execute
jobs:
  build:
    runs-on: ubuntu-latest

    # Strategy for running the jobs - this section is useful for testing across multiple environments
    strategy:
      # A matrix build strategy to test against multiple versions of Node.js
      matrix:
        node-version: [18.x, 20.x]

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - # Checks out the repository under $GITHUB_WORKSPACE, so the job can access it
        uses: actions/checkout@v2

      - # Sets up the specified version of Node.js
        name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - # Caches Node Modules to speed up installation
        name: Cache Node Modules
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - # Installs node modules as specified in the project's package-lock.json
        run: npm ci

      - # Runs ESLint to check for linting errors
        name: Run Linter
        run: npx eslint .

      - # This command will only run if a build script is defined in the package.json
        run: npm run build --if-present

      - # Runs tests as defined in the project's package.json
        run: npm test
```
created an _eslint.config.cjs file_
# Versioning, Tags, and Releases

In this section, I will document the steps I performed today related to versioning the application, creating a new tag, and creating a new release on GitHub.


Script i added for versioning, creating tags, creating release
```bash
bump_version_and_tag:
    name: Bump Version and Create Tag
    runs-on: ubuntu-latest
    needs: build  # Ensures version bump runs only after CI checks pass
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Bump version and push tag
        uses: anothrNick/github-tag-action@1.26.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          DEFAULT_BUMP: patch
          
      - name: Set version output from tag
        run: echo "VERSION=${GITHUB_REF##*/}" >> $GITHUB_ENV

  create_release:
    name: Create GitHub Release
    runs-on: ubuntu-latest
    needs: bump_version_and_tag  # Ensures release happens after tag is created
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set tag name
        id: set_tag_name
        run: |
          TAG_NAME="v1.${{ github.run_number }}"  # Using github.run_number to ensure unique version
          echo "TAG_NAME=${TAG_NAME}" >> $GITHUB_ENV

      - name: Debug GITHUB_REF
        run: echo "GITHUB_REF=${GITHUB_REF}"

      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ env.TAG_NAME }}
          release_name: Release ${{ env.TAG_NAME }}
          body: |
            Changes in this Release
            - First Change
            - Second Change
          draft: false
          prerelease: false

  deploy_to_aws:
    name: Deploy to AWS EC2
    runs-on: ubuntu-latest
    needs: create_release  # Ensures deployment happens after release is created
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        # Checks out your repository under $GITHUB_WORKSPACE.

      - name: Set up AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-2
        # Configures AWS credentials from GitHub secrets.

      - name: Set up SSH key for EC2
        uses: webfactory/ssh-agent@v0.5.3
        with:
          ssh-private-key: ${{ secrets.EC2_SSH_PRIVATE_KEY }}
        # Uses your EC2 private key stored in GitHub Secrets to authenticate.

      - name: Deploy to EC2
        run: |
          ssh -o StrictHostKeyChecking=no ec2-user@${{ secrets.EC2_PUBLIC_IP }} << 'EOF'
            # Your deployment script
            cd /home/ec2-user/github_actions_demo
            git pull origin main
            npm ci  # Install dependencies
            npm run build  # Build the project
            # Stop any existing process running on port 3000
            sudo lsof -t -i:3000 | xargs sudo kill -9 || echo "No process running on port 3000"
            nohup npm run start > app.log 2>&1 &  # Start the application (adjust according to your app)

            # Check if the app is running
            sleep 5
            lsof -i :3000
          EOF
        # SSH into the EC2 instance and run the deployment commands        
```
## Deploying to EC2 on AWS
To deploy my application to EC2, I followed these steps:

SSH into the EC2 Instance
First, I logged into the EC2 instance using SSH:
```bash
ssh -i /path/to/your-key.pem ec2-user@your-ec2-ip
```

To ensure that the application keeps running after I disconnect, I used nohup to run it in the background:
Finally, I accessed the deployed application by visiting the EC2 instance's public IP and port:

```bash
nohup node node.js > app.log 2>&1 &
curl http://your-ec2-ip:3000
```

# Setting Up Secrets and Access Tokens

In the context of CI/CD, I set up GitHub Secrets and Access Tokens to securely store credentials for accessing AWS and other services.

## Set Up AWS Access Keys in GitHub Secrets

To securely store AWS credentials for use in the CI/CD pipeline, I added the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as GitHub Secrets. This ensures that sensitive data such as access keys are kept safe during the deployment process.

### Steps:
1. Navigate to **GitHub Settings** > **Secrets and variables** > **Actions**.
2. Click on **New repository secret**.
3. Add the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` with their corresponding values.

## Using the Secrets in GitHub Actions

In my GitHub Actions workflow, I referenced the AWS credentials stored as secrets to ensure secure deployment to AWS.

### Example:

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: us-east-1
```

## Caching Dependencies for Performance Optimization

To speed up the CI/CD process, caching dependencies helps prevent redundant downloads and installations of the same packages across multiple workflow runs. This significantly improves build times.

### Implementing Caching in GitHub Actions

```yaml
- name: Cache Node Modules
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```




## PUSH THE CHANGES TO GITHUB
SEE THE WORKFLOW ON ACTIONS TAB.

