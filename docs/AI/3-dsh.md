---
title: dsh
sidebar_position: 3
---


## 安装

### 启动方式1

```
npx @deepseek-ai/dsh web 
```



### 启动方式2

```
dsh web
```

#### 前提:

```
npm i -g pnpm
npm i -g @deepseek-ai/dsh
```



## 插件

```
# web ui
dsh plugin --profile web add @linxin666/dsh-web-all@latest 

# 提示词增强
dsh-prompt-enhancer

# 设计模板--删掉吧
deepseek-idesign

# 流程图
dsh plugin --profile web add @tt-a1i/archify-dsh@0.1.0
对话中说出 Use the archify skill to generate an architecture diagram for this project


# 忘了
dsh plugin --profile web approve-builds
```



#### 删除插件命令

```
dsh plugin --profile web remove @linxin666/dsh-web-all
```