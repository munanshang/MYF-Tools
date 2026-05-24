<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCategories, getToolsByCategory } from '../tools/registry'
import AnnouncementModal from '../components/AnnouncementModal.vue'

const route = useRoute()
const router = useRouter()
const drawer = ref(false)

const pageTitle = computed(() => (route.meta.title as string) || '码艺坊在线工具箱')
const isHome = computed(() => route.path === '/')

const categories = computed(() =>
  getCategories().map((cat) => ({
    name: cat,
    tools: getToolsByCategory(cat),
  }))
)

function goHome() {
  drawer.value = false
  router.push('/')
}

function goTool(path: string) {
  drawer.value = false
  router.push(path)
}
</script>

<template>
  <div class="layout">
    <a-layout-header class="header">
      <div class="header-inner">
        <div class="header-left">
          <a-button
            v-if="!isHome"
            type="text"
            class="header-btn"
            aria-label="返回首页"
            @click="goHome"
          >
            <template #icon>
              <icon-left />
            </template>
          </a-button>
          <a-button
            type="text"
            class="header-btn menu-btn"
            aria-label="打开菜单"
            @click="drawer = true"
          >
            <template #icon>
              <icon-menu />
            </template>
          </a-button>
        </div>
        <div class="header-brand">
          <img src="/logo.png" alt="logo" class="header-logo" />
          <span class="header-title">{{ pageTitle }}</span>
        </div>
        <div class="header-right">
          <a-button type="text" class="header-btn" @click="goHome">
            <template #icon>
              <icon-home />
            </template>
            首页
          </a-button>
          <a-button type="text" class="header-btn" @click="router.push('/changelog')">
            <template #icon>
              <icon-history />
            </template>
            日志
          </a-button>
          <a-button type="text" class="header-btn" @click="router.push('/feedback')">
            <template #icon>
              <icon-message />
            </template>
            反馈
          </a-button>
        </div>
      </div>
    </a-layout-header>

    <a-drawer
      v-model:visible="drawer"
      class="nav-drawer"
      placement="left"
      :width="300"
      :footer="false"
      unmount-on-close
    >
      <template #title>
        <span class="drawer-title">全部工具</span>
      </template>
      <div v-for="cat in categories" :key="cat.name" class="drawer-cat">
        <p class="drawer-cat-title">{{ cat.name }}</p>
        <a-list :bordered="false" class="drawer-list">
          <a-list-item
            v-for="tool in cat.tools"
            :key="tool.id"
            class="drawer-item"
            @click="goTool(tool.path)"
          >
            <a-list-item-meta :title="tool.title" :description="tool.description" />
          </a-list-item>
        </a-list>
      </div>

      <div class="drawer-divider" />
      <a-list :bordered="false" class="drawer-list">
        <a-list-item class="drawer-item" @click="goTool('/changelog')">
          <a-list-item-meta title="更新日志" description="网站维护与工具变更记录" />
        </a-list-item>
        <a-list-item class="drawer-item" @click="goTool('/feedback')">
          <a-list-item-meta title="反馈与建议" description="公众号 / 邮件反馈，期待工具" />
        </a-list-item>
      </a-list>
    </a-drawer>

    <main class="main">
      <router-view />
    </main>

    <footer class="footer">
      <p class="footer-text">码艺坊在线工具箱 · 由 <a class="footer-link" href="https://qishuai.top" target="_blank" rel="noopener">目南殇</a> 提供技术支持</p>
      <p class="footer-text footer-copy">&copy; 2026 - 至今 保留所有权利 · MIT License</p>
      <div class="footer-links">
        <a class="footer-link-item" href="https://qishuai.top" target="_blank" rel="noopener">
          <icon-link :size="14" />
          <span>个人博客</span>
        </a>
        <a class="footer-link-item" href="https://github.com/munanshang/MYF-Tools" target="_blank" rel="noopener">
          <icon-github :size="14" />
          <span>GitHub</span>
        </a>
        <a class="footer-link-item" href="mailto:shuai.qi@outlook.com">
          <icon-email :size="14" />
          <span>shuai.qi@outlook.com</span>
        </a>
      </div>
    </footer>

    <AnnouncementModal />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-height);
  padding: 0 12px;
  padding-top: env(safe-area-inset-top, 0);
  background: rgb(15 23 42 / 72%);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgb(255 255 255 / 8%);
  box-shadow: 0 1px 0 rgb(0 0 0 / 6%), 0 4px 24px rgb(15 23 42 / 12%);
}

.header-inner {
  display: flex;
  align-items: center;
  height: 100%;
  max-width: var(--content-max);
  margin: 0 auto;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
  margin-left: auto;
}

.header-brand {
  display: flex;
  align-items: center;
  margin-left: 8px;
  min-width: 0;
  gap: 8px;
}

.header-logo {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  object-fit: contain;
}

.header-title {
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: rgb(255 255 255 / 95%);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-btn {
  color: rgb(255 255 255 / 88%) !important;
  border-radius: var(--radius-sm) !important;
}

.header-btn:hover {
  color: #fff !important;
  background: rgb(255 255 255 / 10%) !important;
}

.menu-btn {
  margin-left: -4px;
}

.main {
  flex: 1;
  width: 100%;
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 20px 16px;
  box-sizing: border-box;
}

.drawer-title {
  font-weight: 600;
  letter-spacing: -0.02em;
}

.drawer-item {
  cursor: pointer;
  border-radius: var(--radius-md);
  margin-bottom: 4px;
  padding: 4px 8px !important;
  transition:
    background var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.drawer-item:hover {
  background: var(--color-fill-2);
  transform: translateX(2px);
}

.footer {
  text-align: center;
  padding: 24px 16px calc(20px + env(safe-area-inset-bottom, 0));
  border-top: 1px solid var(--border-subtle);
  margin-top: 20px;
}

.footer-text {
  margin: 0 0 4px;
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  color: var(--text-tertiary);
}

.footer-copy {
  color: var(--text-tertiary);
  font-size: 0.6875rem;
}

.footer-link {
  color: var(--brand-500);
  text-decoration: none;
  transition: color var(--duration-fast) ease;
}

.footer-link:hover {
  color: var(--brand-600);
  text-decoration: underline;
}

.footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 6px;
}

.footer-link-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--duration-fast) ease;
}

.footer-link-item:hover {
  color: var(--brand-500);
}

@media (min-width: 768px) {
  .header {
    padding: 0 24px;
  }

  .main {
    padding: 32px 24px 40px;
  }

  .header-title {
    font-size: 1rem;
  }
}
</style>

<style>
.nav-drawer .arco-drawer-header {
  border-bottom: 1px solid var(--border-subtle);
}

.nav-drawer .arco-drawer-body {
  padding: 12px 8px;
}

.drawer-cat {
  margin-bottom: 16px;
}

.drawer-divider {
  height: 1px;
  margin: 8px 8px 12px;
  background: var(--border-subtle);
}

.drawer-cat-title {
  margin: 0 0 4px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}

.nav-drawer .drawer-list {
  margin-bottom: 0;
}

.nav-drawer .arco-list-item-meta-title {
  font-weight: 600;
  color: var(--text-primary);
}

.nav-drawer .arco-list-item-meta-description {
  color: var(--text-secondary);
  font-size: 0.8125rem;
}
</style>
