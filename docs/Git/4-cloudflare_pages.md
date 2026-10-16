---
title: cloudflare_pages
sidebar_position: 4
---

## 搭建流程

#### 官网 : https://dash.cloudflare.com/

```shell
# docusaurus官网提供两种部署方式
https://docusaurus.io/zh-CN/docs/deployment#deploying-to-cloudflare
# 1.Workers
https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/docusaurus/
# 2.Pages
https://developers.cloudflare.com/pages/framework-guides/deploy-a-docusaurus-site/
```

### workers

#### 注册

```shell
# 点击链接 Workers Builds 
# 进来再点击 Workers Builds ,来到这个页面
https://developers.cloudflare.com/workers/ci-cd/builds/
# 点击 Go to Workers & Pages

# 切换中文: 右上角头像
# 创建应用程序 -> 选择github -> 选择仓库下一步 -> 默认 点击部署
```

#### 阿里云配置域名

```shell
# 域名管理 -> 域名列表 -> 管理 -> DNS修改, 填入cloudflare给的名称服务器
```

#### 配置域名

```shell
# cloudflare首页 -> 计算 -> Workers 和 Pages -> 选中程序 -> 添加域
```