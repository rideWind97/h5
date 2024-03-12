# Mk-H5

## 项目简介

makefriends H5项目

## 配置

react18 + react-router6 + vite4 + antd-mobile + ts + less

## 工程化配置

husky + commitlint + eslint + prettier + tsconfig 都已经配置完成

- 上传代码自动检测提交测试是否正确
- 上传代码自动检测文件格式是否正确

## 全局安装 pnpm

```bash
npm install -g pnpm
```

node版本建议 16+

## 下载依赖

```bash
pnpm install
```

## 启动

```bash
pnpm dev
```

## 分支

| 分支名  | 描述 |
| ------- | ---- |
| master  | 线上 |
| develop | 测试 |


## iconfont
如果iconfont更新了，直接更新iconfont的cdn，在iconfont上或者最新cdn，然后在index.html上更新cdn

## 适配
本项目中，样式单位全部使用rem，然后安装csstoRem的vscode插件，安装UI写像素单位，如14px时，选择vscode插件会提醒转成rem单位像素，选择即可

#### push code 和 打包成功后都会有消息提示，在飞书群中
