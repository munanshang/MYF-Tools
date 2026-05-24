<script setup lang="ts">
import { tools, getCategories } from '../tools/registry'
import { computed } from 'vue'

const toolCount = tools.length
const catCount = computed(() => getCategories().length)
</script>

<template>
  <div class="tool-page about-page">
    <div class="about-hero">
      <img src="/logo.png" alt="logo" class="about-logo" />
      <h1 class="about-title">码艺坊在线工具箱</h1>
      <p class="about-sub">轻量、实用的在线开发工具集</p>
    </div>

    <div class="about-grid">
      <div class="about-card">
        <span class="about-num">{{ toolCount }}</span>
        <span class="about-num-label">实用工具</span>
      </div>
      <div class="about-card">
        <span class="about-num">{{ catCount }}</span>
        <span class="about-num-label">工具分类</span>
      </div>
      <div class="about-card">
        <span class="about-num">MIT</span>
        <span class="about-num-label">开源协议</span>
      </div>
    </div>

    <div class="about-section">
      <h2 class="about-h2">技术栈</h2>
      <div class="tech-tags">
        <span class="tech-tag">Vue 3</span>
        <span class="tech-tag">TypeScript</span>
        <span class="tech-tag">Vite</span>
        <span class="tech-tag">Arco Design</span>
        <span class="tech-tag">Vue Router</span>
      </div>
    </div>

    <div class="about-section">
      <h2 class="about-h2">关于作者</h2>
      <p class="about-text">
        目南殇，独立开发者，热爱前端与工具开发。
      </p>
      <div class="about-links">
        <a href="https://qishuai.top" target="_blank" rel="noopener" class="about-link">
          <icon-link :size="14" />
          <span>qishuai.top</span>
        </a>
        <a href="https://github.com/munanshang" target="_blank" rel="noopener" class="about-link">
          <icon-github :size="14" />
          <span>github.com/munanshang</span>
        </a>
        <a href="mailto:shuai.qi@outlook.com" class="about-link">
          <icon-email :size="14" />
          <span>shuai.qi@outlook.com</span>
        </a>
      </div>
    </div>

    <div class="about-section">
      <h2 class="about-h2">开源协议</h2>
      <p class="about-text">
        本项目采用 MIT 协议开源，使用、修改、分发时须保留原作者信息与 GitHub 地址。
      </p>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 540px;
  margin: 0 auto;
}

.about-hero {
  text-align: center;
  margin-bottom: 28px;
}

.about-logo {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  margin-bottom: 14px;
}

.about-title {
  margin: 0 0 4px;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.about-sub {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-tertiary);
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 28px;
}

.about-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  background: var(--color-fill-1);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
}

.about-num {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--brand-600);
  margin-bottom: 4px;
}

.about-num-label {
  font-size: 0.6875rem;
  color: var(--text-tertiary);
}

.about-section {
  margin-bottom: 24px;
}

.about-h2 {
  margin: 0 0 10px;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--text-tertiary);
  text-transform: uppercase;
}

.about-text {
  margin: 0 0 10px;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-secondary);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--brand-600);
  background: var(--brand-gradient-subtle);
  border: 1px solid rgb(99 102 241 / 12%);
  border-radius: 999px;
}

.about-links {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.about-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: var(--brand-500);
  text-decoration: none;
  transition: color var(--duration-fast) ease;
}

.about-link:hover {
  color: var(--brand-700);
}
</style>
