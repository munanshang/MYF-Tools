<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { tools, getCategories, getToolsByCategory } from '../tools/registry'

const LAUNCH_DATE = new Date('2026-05-25T00:00:00+08:00')

const router = useRouter()

const categories = computed(() =>
  getCategories().map((cat) => ({
    name: cat,
    id: `cat-${cat}`,
    tools: getToolsByCategory(cat),
  }))
)

const activeCat = ref(categories.value[0]?.name ?? '')

function openTool(path: string) {
  router.push(path)
}

function scrollToCat(id: string, name: string) {
  activeCat.value = name
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const uptime = ref('')

function updateUptime() {
  const diff = Date.now() - LAUNCH_DATE.getTime()
  const seconds = Math.floor(diff / 1000) % 60
  const minutes = Math.floor(diff / (1000 * 60)) % 60
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const years = Math.floor(days / 365)
  const remainDays = days - years * 365

  const parts: string[] = []
  if (years) parts.push(`${years} 年`)
  if (remainDays) parts.push(`${remainDays} 天`)
  if (!years) {
    parts.push(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
  }
  uptime.value = parts.join(' ')
}

let uptimeTimer: ReturnType<typeof setInterval> | null = null

let observer: IntersectionObserver | null = null

onMounted(() => {
  updateUptime()
  uptimeTimer = setInterval(updateUptime, 1000)

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const name = (entry.target as HTMLElement).dataset.catName
          if (name) activeCat.value = name
        }
      }
    },
    { rootMargin: '-20% 0px -70% 0px' }
  )

  for (const cat of categories.value) {
    const el = document.getElementById(cat.id)
    if (el) observer.observe(el)
  }
})

onUnmounted(() => {
  observer?.disconnect()
  if (uptimeTimer) clearInterval(uptimeTimer)
})
</script>

<template>
  <div class="home">
    <nav class="toc-sidebar">
      <p class="toc-label">分类目录</p>
      <ul class="toc-list">
        <li
          v-for="cat in categories"
          :key="cat.id"
          class="toc-item"
          :class="{ active: activeCat === cat.name }"
          @click="scrollToCat(cat.id, cat.name)"
        >
          {{ cat.name }}
        </li>
      </ul>
    </nav>

    <section class="hero">
      <span class="hero-badge">开发者工具</span>
      <h1 class="hero-title">
        <span class="hero-title-gradient">码艺坊在线工具箱</span>
      </h1>
      <p class="hero-subtitle">
        共 {{ tools.length }} 款常用开发小工具，开箱即用
        <span class="hero-dot" aria-hidden="true">·</span>
        电脑与手机均可访问
      </p>

      <div class="stats-row">
        <template v-if="uptime">
          <div class="stat-item">
            <span class="stat-value">{{ uptime }}</span>
            <span class="stat-label">已稳定运行</span>
          </div>
          <div class="stat-divider" aria-hidden="true" />
        </template>
        <div class="stat-item">
          <span id="busuanzi_value_site_pv" class="stat-value">-</span>
          <span class="stat-label">总访问量</span>
        </div>
        <div class="stat-divider" aria-hidden="true" />
        <div class="stat-item">
          <span id="busuanzi_value_site_uv" class="stat-value">-</span>
          <span class="stat-label">总访客</span>
        </div>
      </div>
    </section>

    <section
      v-for="cat in categories"
      :key="cat.name"
      :id="cat.id"
      :data-cat-name="cat.name"
      class="category-section"
    >
      <h2 class="category-title">{{ cat.name }}</h2>
      <a-row :gutter="[16, 16]" class="tool-grid">
        <a-col
          v-for="tool in cat.tools"
          :key="tool.id"
          :xs="24"
          :sm="12"
          :md="8"
        >
          <a-card
            class="tool-card"
            :bordered="false"
            hoverable
            @click="openTool(tool.path)"
          >
            <div class="tool-card-inner">
              <div class="tool-icon" aria-hidden="true">{{ tool.icon }}</div>
              <div class="tool-info">
                <div class="tool-title">{{ tool.title }}</div>
                <div class="tool-desc">{{ tool.description }}</div>
              </div>
              <icon-right class="tool-arrow" />
            </div>
          </a-card>
        </a-col>
      </a-row>
    </section>
  </div>
</template>

<style scoped>
.home {
  padding-bottom: 12px;
  position: relative;
}

/* ── TOC sidebar ────────────────────────────── */
.toc-sidebar {
  display: none;
}

@media (min-width: 1280px) {
  .toc-sidebar {
    display: block;
    position: fixed;
    left: calc((100vw - var(--content-max)) / 2 - 180px);
    top: calc(var(--header-height) + 80px);
    width: 150px;
    z-index: 70;
  }

  .toc-label {
    margin: 0 0 12px;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-tertiary);
  }

  .toc-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .toc-item {
    padding: 6px 10px;
    font-size: 0.8125rem;
    color: var(--text-secondary);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition:
      color var(--duration-fast) ease,
      background var(--duration-fast) ease;
  }

  .toc-item:hover {
    color: var(--text-primary);
    background: var(--color-fill-2);
  }

  .toc-item.active {
    color: var(--brand-600);
    background: var(--brand-gradient-subtle);
    font-weight: 600;
  }
}

/* ── hero ───────────────────────────────────── */
.hero {
  margin-bottom: 32px;
  text-align: center;
  padding: 8px 0 4px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  margin-bottom: 16px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--brand-600);
  background: var(--brand-gradient-subtle);
  border: 1px solid rgb(99 102 241 / 18%);
  border-radius: 999px;
}

.hero-title {
  margin: 0 0 12px;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.hero-title-gradient {
  background: linear-gradient(135deg, #0f172a 0%, #334155 40%, #4f46e5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  margin: 0 auto;
  max-width: 28em;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-secondary);
}

.hero-dot {
  margin: 0 0.35em;
  color: var(--text-tertiary);
}

/* ── stats ──────────────────────────────────── */
.stats-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 18px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-value {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--brand-600);
  font-variant-numeric: tabular-nums;
}

.stat-label {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}

.stat-divider {
  width: 1px;
  height: 24px;
  background: var(--border-subtle);
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .stats-row {
    gap: 14px;
  }

  .stat-value {
    font-size: 1rem;
  }
}

/* ── category ───────────────────────────────── */
.category-section {
  margin-bottom: 28px;
}

.category-title {
  margin: 0 0 12px;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  padding-left: 2px;
}

.tool-grid {
  margin-top: 0;
}

.tool-card {
  cursor: pointer;
  height: 100%;
  background: var(--surface) !important;
  border-radius: var(--radius-lg) !important;
  box-shadow: var(--shadow-card) !important;
  border: 1px solid var(--border-subtle) !important;
  transition:
    transform var(--duration-normal) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out),
    border-color var(--duration-normal) var(--ease-out) !important;
}

.tool-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card-hover) !important;
  border-color: rgb(99 102 241 / 15%) !important;
}

.tool-card :deep(.arco-card-body) {
  padding: 18px 20px !important;
}

.tool-card-inner {
  display: flex;
  align-items: center;
  gap: 14px;
}

.tool-icon {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: var(--brand-gradient-subtle);
  border: 1px solid rgb(99 102 241 / 12%);
  color: var(--brand-600);
  font-weight: 700;
  font-size: 1rem;
  transition:
    transform var(--duration-normal) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out);
}

.tool-card:hover .tool-icon {
  transform: scale(1.04);
  box-shadow: 0 4px 16px rgb(99 102 241 / 18%);
}

.tool-info {
  flex: 1;
  min-width: 0;
}

.tool-title {
  font-weight: 600;
  font-size: 0.9375rem;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.tool-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tool-arrow {
  flex-shrink: 0;
  color: var(--text-tertiary);
  font-size: 16px;
  transition:
    color var(--duration-fast) ease,
    transform var(--duration-normal) var(--ease-out);
}

.tool-card:hover .tool-arrow {
  color: var(--brand-500);
  transform: translateX(3px);
}

@media (min-width: 768px) {
  .hero {
    margin-bottom: 40px;
    padding: 16px 0 8px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .tool-card :deep(.arco-card-body) {
    padding: 20px 22px !important;
  }
}
</style>
