---
title: github_page
sidebar_position: 5
---

## 搭建流程

```
1.初始化
npx create-docusaurus@latest my-website classic

git init 
git add .
git commit -m "first commit" 
git branch -M main 
git remote add origin https://github.com/LH-TH/blog.git
git push -u origin main
输入用户名和2的令牌

2.令牌设置
个人账号 
	- 设置 
	- Developer settings 
	- Personal access tokens 
	- Tokens (classic) 
	- Generate new token (classic)
	- 选择repo和workflow, 得到token ghp_xxxx

3.修改配置文件 docusaurus.config.js 和  .github/deploy.yml
4.在github的项目里 设置 - pages - Source 选 GitHub Actions
```

##### deploy.yml 文件
```yml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
    paths-ignore:
      - "**/README.md"

permissions:
  contents: read

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    name: Build Docusaurus
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build website
        run: npm run build
      - name: Upload Build Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: build

  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    needs: build
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```