<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRINCE-MDXI Bot Setup</title>
    <style>
        body { font-family: 'Arial', sans-serif; background-color: #0d0d0d; color: #fff; padding: 20px; }
        h1, h2, h3, h4 { text-align: center; }
        .repo, .section { margin: 20px auto; padding: 20px; background: #1a1a1a; border-radius: 8px; width: 90%; max-width: 800px; }
        .btn { display: inline-block; padding: 10px 20px; margin: 10px 0; background: #ff00ab; color: #fff; text-decoration: none; border-radius: 5px; transition: 0.3s; }
        .btn:hover { background: #cc0099; }
        img { border-radius: 8px; }
        .warning { color: #ffcc00; text-align: center; font-size: 14px; }
        pre { background: #262626; padding: 10px; border-radius: 5px; overflow-x: auto; }
    </style>
</head>
<body>
    <img src="https://i.imgur.com/dBaSKWF.gif" width="100%" height="90" alt="PRINCE-MDXI">
    <h1>PRINCE-MDXI WhatsApp Bot 🌝💚</h1>
    <p align="center">Simple and Best WhatsApp Bot Created by <strong>PRINCE MAYEL</strong></p>

    <div class="repo">
        <h2>🔗 Repository</h2>
        <a href="https://github.com/mayelprince/PRINCE-MDXI/fork" class="btn">⭐ Fork the Repo</a>
        <img src="your image url" width="300" height="200" alt="Bot Image">
    </div>

    <div class="section">
        <h2>🔑 Get Session ID</h2>
        <p>Generate your session ID for deployment:</p>
        <a href="https://princeweb.onrender.com" class="btn">🚀 Get Pair Code</a>
    </div>

    <div class="section">
        <h2>⚙️ Setup Guide</h2>
        <ol>
            <li>Fork and star the repository.</li>
            <li>Generate your session ID and copy it.</li>
            <li>Edit the <code>config.js</code> file and paste the session ID.</li>
        </ol>
    </div>

    <div class="section">
        <h2>🚀 Deployment Options</h2>
        <a href="https://dashboard.heroku.com/new?template=https%3A%2F%2Fgithub.com%2Fmayelprince%2FPRINCE-MDXI" class="btn">Deploy on Heroku</a>
        <a href="https://render.com/deploy?repo=https://github.com/mayelprince/PRINCE-MDXI.git" class="btn">Deploy on Render</a>
    </div>

    <div class="section">
        <h2>🛠️ GitHub Workflow Deployment</h2>
        <p>Follow these steps for GitHub Workflow Deployment:</p>
        <pre>
name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Start application
      run: npm start
        </pre>
        <p class="warning">⚠️ Important: Workflow deployment may risk GitHub account suspension for newer accounts. Use at your own discretion.</p>
    </div>

    <div class="section">
        <h2>🙏 Thank You!</h2>
        <p>Developed by <strong><a href="https://github.com/mayelprince" style="color: #ff00ab;">PRINCE MAYEL</a></strong></p>
    </div>

</body>
</html>
