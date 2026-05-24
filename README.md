# 在线工具箱

基于 **Vue 3 + Vite + Vue Router + [Arco Design Vue](https://arco.design/vue)** 的轻量工具网站。Arco Design 由字节跳动出品，对 PC 与移动端均友好，组件丰富且文档完善。

## 运行

```bash
npm install
npm run dev
```

构建生产包：

```bash
npm run build
npm run preview
```

## 项目结构

```
src/
  layouts/DefaultLayout.vue   # 顶栏 + 侧滑菜单 + 主内容
  views/HomeView.vue          # 首页工具导航
  views/tools/                # 各工具页面
  tools/registry.ts           # 工具注册表（导航与路由共用）
  router/index.ts
  types/tool.ts
```

## 添加新工具

1. 在 `src/views/tools/` 新建页面组件，例如 `MyToolView.vue`
2. 在 `src/tools/registry.ts` 的 `tools` 数组中追加一项：

```ts
{
  id: 'my-tool',
  title: '我的工具',
  description: '简短说明',
  path: '/tools/my-tool',
  icon: '🔧',
  component: () => import('../views/tools/MyToolView.vue'),
},
```

路由会根据 `registry` 自动生成，首页导航同步更新，无需再改 `router/index.ts`。

## 已内置工具

- JSON 格式化 / 压缩
- Base64 编解码（UTF-8）
- Unix 时间戳转换
