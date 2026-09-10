---
title: claude
sidebar_position: 1
---

## 下载

```
npm install -g @anthropic-ai/claude-code

claude --version
```

## 配置

##### 在用户目录下C:\Users\haoti\.claude 新建settings.json, 填入key

```
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-xxxxx",
    "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
    "ANTHROPIC_MODEL": "deepseek-v4-pro[1m]",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-flash",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-pro[1m]",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-pro[1m]",
    "CLAUDE_CODE_SUBAGENT_MODEL": "deepseek-v4-flash"
  },
  "theme": "auto"
}
```

## 使用

```
vscode 搜索 Claude Code for VS Code
```

## 更新

```
npm update -g @anthropic-ai/claude-code
```