---
title: cms
sidebar_position: 10
---

## sveltia-cms 本地

```
1.文件
新增 static/admin/index.html  sveltia CMS入口页，CDN方式
新增 static/admin/config.yml  sveltia全部配置

2.访问
http://localhost:3000/admin/
```

## sveltia-cms 线上(未完成)

### 1.配置文件

```yaml
# ============================================
# Sveltia CMS 配置（Decap 兼容语法）
# 后端：Gitea（OAuth2 隐式授权，浏览器直连 Gitea API）
# ============================================

backend:
  name: gitea
  repo: admin/docusaurus
  base_url: https://git.holab.cc
  api_root: https://git.holab.cc/api/v1
  auth_endpoint: /login/oauth/authorize
  auth_scope: read_user,write:repository
  # Gitea「设置 → 应用 → 管理 OAuth2 应用程序」里重定向 URI 需包含：
  #   https://holab.cc/admin/
  app_id: 69ca2c8d-5d6a-4f9d-b6c5-xxxxxxxx

media_folder: static/img
public_folder: /img

site_url: https://holab.cc
display_url: https://holab.cc

logo:
  src: /img/code.ico
  show_in_header: true

collections:

  - name: 'blog_1970'
    label: '博客-初始'
    label_singular: '博客'
    folder: 'blog/1970-01-01-welcome'
    create: true
    delete: true
    format: frontmatter
    slug: '{{slug}}'
    summary: '{{title}} — {{date | date("YYYY-MM-DD")}}'
    preview_path: 'blog/{{slug}}'
    fields:
      - { label: '标题', name: 'title', widget: 'string' }
      - { label: '标签', name: 'tags', widget: 'list', required: false, default: [] }
      - { label: '正文', name: 'body', widget: 'markdown', modes: [raw, rich_text] }

  - name: 'blog_2025'
    label: '博客-2025'
    label_singular: '博客'
    folder: 'blog/2025-01-01-xy'
    create: true
    delete: true
    format: frontmatter
    slug: '{{slug}}'
    summary: '{{title}} — {{date | date("YYYY-MM-DD")}}'
    preview_path: 'blog/{{slug}}'
    fields:
      - { label: '标题', name: 'title', widget: 'string' }
      - { label: '标签', name: 'tags', widget: 'list', required: false, default: [] }
      - { label: '正文', name: 'body', widget: 'markdown', modes: [raw, rich_text] }

  - name: 'blog_2026'
    label: '博客-2026'
    label_singular: '博客'
    folder: 'blog/2026-01-01-xy'
    create: true
    delete: true
    format: frontmatter
    slug: '{{slug}}'
    summary: '{{title}} — {{date | date("YYYY-MM-DD")}}'
    preview_path: 'blog/{{slug}}'
    fields:
      - { label: '标题', name: 'title', widget: 'string' }
      - { label: '标签', name: 'tags', widget: 'list', required: false, default: [] }
      - { label: '正文', name: 'body', widget: 'markdown', modes: [raw, rich_text] }

  - name: 'docs_2026'
    label: '文档-2026开发笔记'
    label_singular: '文档'
    folder: 'docs/2026开发笔记'
    create: true
    delete: true
    format: frontmatter
    slug: '{{slug}}'
    summary: '{{title}}'
    preview_path: 'docs/{{slug}}'
    fields:
      - { label: '标题', name: 'title', widget: 'string' }
      - { label: '侧边栏位置', name: 'sidebar_position', widget: 'number', required: false, default: 1 }
      - { label: '正文', name: 'body', widget: 'markdown', modes: [raw, rich_text] }

  - name: 'docs_me'
    label: '文档-个人资料'
    label_singular: '文档'
    folder: 'docs/个人资料'
    create: true
    delete: true
    format: frontmatter
    slug: '{{slug}}'
    summary: '{{title}}'
    preview_path: 'docs/{{slug}}'
    fields:
      - { label: '标题', name: 'title', widget: 'string' }
      - { label: '侧边栏位置', name: 'sidebar_position', widget: 'number', required: false, default: 1 }
      - { label: '正文', name: 'body', widget: 'markdown', modes: [raw, rich_text] }

  - name: 'docs_xy'
    label: '文档-aa资料'
    label_singular: '文档'
    folder: 'docs/aa资料'
    create: true
    delete: true
    format: frontmatter
    slug: '{{slug}}'
    summary: '{{title}}'
    preview_path: 'docs/{{slug}}'
    fields:
      - { label: '标题', name: 'title', widget: 'string' }
      - { label: '侧边栏位置', name: 'sidebar_position', widget: 'number', required: false, default: 1 }
      - { label: '正文', name: 'body', widget: 'markdown', modes: [raw, rich_text] }

```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <title>Sveltia CMS</title>
    <link href="/admin/config.yaml" type="application/yaml" rel="cms-config-url" />
  </head>
  <body>
    <script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
  </body>
</html>
```

### 2.gitea

自行创建

### 3.仓库里设置 OAuth2

```
创建新应用
回调地址写https://holab.cc/admin/
客户端id填入配置文件里: 69ca2c8d-5d6a-4f9d-b6c5-xxxxxxxx
```

### 4.gitea令牌

```shell
管理 Access Token
repository读写,user读
返回一串id: dd603d6521bxxxxxxxxxxxxxxxxxxxxxxxx

# edge无法使用 可能需要写在html里
<script>
  if (!Uint8Array.fromBase64) {
    Uint8Array.fromBase64 = function(base64) {
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes;
    };
  }
</script>
```

### 5.出现的问题

```shell
#1.开启cors
/www/dk_project/dk_app/gitea/gitea_Z2fr/gitea/gitea/conf/app.ini
增加以下内容
[cors]
ENABLED = true
ALLOW_DOMAIN = holab.cc
METHODS = GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS
MAX_AGE = 10m
ALLOW_CREDENTIALS = true
HEADERS = Content-Type,Authorization

#2.显示域名不一致
/www/dk_project/dk_app/gitea/gitea_Z2fr/gitea/gitea/conf/app.ini
修改[server]
ROOT_URL = https://git.holab.cc/

#3.配置nginx
location ^~ / { 里填写

proxy_set_header X-Forwarded-Proto $scheme;
# CORS 跨域支持
if ($request_method = 'OPTIONS') {
    add_header 'Access-Control-Allow-Origin' 'https://holab.cc';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';
    add_header 'Access-Control-Max-Age' 86400;
    return 204;
}

add_header 'Access-Control-Allow-Origin' 'https://holab.cc' always;
```

```shell
#runner执行器下载地址
https://gitea.com/gitea/runner/releases
wget https://gitea.com/gitea/runner/releases/download/v3.2.0/gitea-runner-3.2.0-linux-amd64
修改命名为gitea-runner
sudo mv gitea-runner /usr/local/bin/
sudo chmod +x /usr/local/bin/gitea-runner

sudo useradd --system --shell /bin/bash --create-home gitea-runner
sudo -u gitea-runner bash
cd /home/gitea-runner
gitea-runner register \
  --no-interactive \
  --instance https://git.holab.cc \
  --token ZpYr2fxJQ5JxxOu87DRyNjcJORCUcSIRrmyV5qnD


// 创建服务
sudo vim /etc/systemd/system/gitea-runner.service

[Unit]
Description=Gitea Runner
After=network.target

[Service]
User=gitea-runner
Group=gitea-runner
WorkingDirectory=/home/gitea-runner
ExecStart=/usr/local/bin/gitea-runner daemon
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target

# 重新加载 systemd 配置
sudo systemctl daemon-reload
# 启动服务
sudo systemctl start gitea-runner
# 设置开机自启
sudo systemctl enable gitea-runner
# 查看运行状态
sudo systemctl status gitea-runner
sudo chown -R gitea-runner:gitea-runner /home/gitea-runner

# 不在docker组里导致报错
sudo usermod -aG docker gitea-runner
sudo systemctl restart gitea-runner
```

```
在项目目录下
mkdir -p .gitea/workflows
vim .gitea/workflows/build-deploy.yml


name: Build and Deploy Docusaurus

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Pull latest code and restart service
        run: |
          # 第1步：进入项目目录，拉取最新代码
          cd /opt/www/docusaurus
          git pull

          # 第2步：调用 1Panel API 重启服务
          curl -k -X POST https://47.243.219.114:33013/v2/project/nodejs/restart_project \
            -H "Content-Type: application/json" \
            -d '{"project_name":"docusaurus"}'
```

```
# 你已经在 gitea-runner 用户下，直接执行
git config --global --add safe.directory /opt/www/docusaurus
# root赋权
sudo chown -R gitea-runner:gitea-runner /opt/www/docusaurus
```

```
软连接 docker的node
sudo ln -sf /www/server/nodejs/v22.23.2/bin/node /usr/bin/node
sudo ln -sf /www/server/nodejs/v22.23.2/bin/npm /usr/bin/npm
sudo ln -sf /www/server/nodejs/v22.23.2/bin/pm2 /usr/bin/pm2
sudo ln -sf /www/server/nodejs/v22.23.2/bin/npx /usr/bin/npx


 pm2 start npm --name docusaurus -- run preview

```

