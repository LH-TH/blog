---
title: git命令
sidebar_position: 1
---

## git命令

### 常用的

```shell
#暂存文件
git add .
#提交日志
git commit -m "提交说明"
#推送
git push

#拉取
git pull
```



### 不常用的

```shell
# 免密pull
git remote set-url origin https://<用户名>:<密码>@<域名>/admin/docusaurus.git

# 放弃本地修改
git checkout -- static/admin/config.yaml
# 强制恢复所有修改
git reset --hard HEAD
```



### 一端多git-ssh

```shell
#1.生成ssh秘钥
ssh-keygen -t ed25519 -C "xxxxxx@outlook.com" -f ~/.ssh/id_ed25519_gitee
#私钥 C:\Users\haoti\.ssh\id_ed25519_gitee

#2.找到公钥 C:\Users\haoti\.ssh\id_ed25519_gitee.pub
ssh-ed25519 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

#3.把公钥在git后台配进ssh公钥里
#在C:\Users\haoti\.ssh 下创建config文件,写入
# 个人 Gitee 账号
Host gitee.com
HostName gitee.com
User git
IdentityFile ~/.ssh/id_ed25519_gitee
IdentitiesOnly yes

#绑定git地址
git remote add origin git@gitee.com:admin/docusaurus.git

#测试
ssh -T git@gitee.com
```

