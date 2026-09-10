---
title: github_page
sidebar_position: 5
---


## Docusaurus 项目结构
### 搭建流程

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
