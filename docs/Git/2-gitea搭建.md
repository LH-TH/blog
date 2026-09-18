---
title: gitea搭建
sidebar_position: 2
---

## 安装

### windows端

- 官网下载windows版本: https://about.gitea.com/products/gitea/
- 双击exe即可启动, 默认3000端口, 如端口占用导致失败, 在exe所在目录输入命令: 

```shell
gitea-1.27.3.exe web --port 13000
```

- 数据库选择 SQLite3, 其他默认, 点击安装



### 1panel

- 应用商店下载
- 数据库有啥选啥



## 使用

- 创建存储库
- 无.git文件从零开始

```shell
# 初始化
git init
# 创建一个名为main的新分支
git checkout -b master
# git暂存所有文件
git add .
# 提交暂存文件
git commit -m "first commit"
# 修改推送目录
git remote add origin http://localhost:13000/xxxx/docusaurus.git
# 推送
git push -u origin master
```

- 有.git文件修改提交路径

```shell
# 修改推送目录方法一
git remote set-url origin http://localhost:13000/ling/docusaurus.git
# 修改推送目录方法二
git remote remove origin
git remote add origin http://localhost:13000/ling/docusaurus.git
# 查看当前推送地址
git remote -v 
# 推送
git push -u origin master
```



## windows注册表

- 管理员启动cmd

```shell
# 1.新建服务
sc.exe create gitea start= auto binPath= "\"D:\develop\gitea\gitea-1.27.3.exe\" web --config \"D:\develop\gitea\custom\conf\app.ini\""
# 2.启动服务
sc.exe start gitea
# 3.服务状态
sc.exe query gitea
# 暂停服务
sc.exe stop gitea
# 删除服务
sc.exe delete gitea

# 4.开机启动超时, 需修改为延时启动
sc.exe config gitea start= delayed-auto
# 开机启动改失败了, 尝试修改app.ini为系统名, 然后删除服务 再执行1234
RUN_USER = LING$
```

