

# GITHUB-ACTIONS-DEMO
# CI/CD with Node.js, and GitHub Actions

This project demonstrates the setup of Continuous Integration and Continuous Deployment (CI/CD) pipelines using **GitHub Actions**. The goal of this project is to implement a Continuous Integration (CI) and Continuous Deployment (CD) pipeline using GitHub Actions for a Node.js application. This ensures that the code is automatically tested, built, and deployed when changes are made to the main branch or pull requests are created.


## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [How It Works](#how-it-works)
- [GitHub Actions Workflows](#github-actions-workflows)
- [Running Locally](#running-locally)

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

## PUSH THE CHANGES TO GITHUB
SEE THE WORKFLOW ON ACTIONS TAB.