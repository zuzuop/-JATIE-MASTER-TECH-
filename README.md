# PRINCE-MDXI WhatsApp Bot 🌝💚

![PRINCE-MDXI](https://i.imgur.com/dBaSKWF.gif)

**Simple and Best WhatsApp Bot Created by [PRINCE MAYEL](https://github.com/mayelprince)**

## 🔗 Repository

[![Fork the Repo](https://img.shields.io/badge/Fork%20Repo-blue?style=for-the-badge)](https://github.com/mayelprince/PRINCE-MDXI/fork)

![Bot Image](your image url)

## 🔑 Get Session ID

Generate your session ID for deployment:

[![Get Pair Code](https://img.shields.io/badge/%F0%9F%9A%80%20GET%20PAIR%20CODE%20WEB-ffcc00?style=for-the-badge)](https://princeweb.onrender.com)

## ⚙️ Setup Guide

1. **Fork and star the repository.**
2. **Generate your session ID** and copy it.
3. **Edit the `config.js` file** and paste the session ID.

## 🚀 Deployment Options

- [![Deploy on Heroku](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https%3A%2F%2Fgithub.com%2Fmayelprince%2FPRINCE-MDXI)
- [![Deploy on Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/mayelprince/PRINCE-MDXI.git)

## 🛠️ GitHub Workflow Deployment

Follow these steps for GitHub Workflow Deployment:

```yaml
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
```

⚠️ **Important:** Workflow deployment may risk GitHub account suspension for newer accounts. Use at your own discretion.

## 🙏 Thank You!

**Developed by [PRINCE MAYEL](https://github.com/mayelprince)**
