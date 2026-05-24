<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { changelog, tagLabel, tagColor } from '../data/changelog'

const SKIP_KEY = 'ann_skip_until'
const SESSION_KEY = 'ann_shown'

const visible = ref(false)
const skipPeriod = ref(false)
const latestLog = changelog[0]

onMounted(() => {
  if (sessionStorage.getItem(SESSION_KEY)) return
  const skipUntil = localStorage.getItem(SKIP_KEY)
  if (skipUntil && Date.now() < Number(skipUntil)) return
  setTimeout(() => {
    visible.value = true
  }, 400)
})

function dismiss() {
  visible.value = false
  sessionStorage.setItem(SESSION_KEY, '1')
  if (skipPeriod.value) {
    localStorage.setItem(SKIP_KEY, String(Date.now() + 7 * 24 * 3600 * 1000))
  }
}
</script>

<template>
  <a-modal
    v-model:visible="visible"
    class="announce-modal"
    :footer="false"
    :hide-title="true"
    :width="420"
    :modal-style="{ borderRadius: 'var(--radius-lg)', padding: 0 }"
  >
    <div class="ann-body">
      <!-- fixed header -->
      <div class="ann-header">
        <p class="ann-title">网站公告</p>
        <p class="ann-sub">码艺坊公众号 · 微信扫码关注，获取更多开发工具</p>
      </div>

      <!-- scrollable content -->
      <div class="ann-scroll">
        <div class="ann-qrcode">
          <img src="/qrcode.jpg" alt="公众号二维码" class="qrcode-img" />
        </div>

        <div class="ann-divider">
          <span class="ann-divider-text">最新更新</span>
        </div>

        <div v-if="latestLog" class="ann-log">
          <div class="ann-log-head">
            <span class="ann-log-date">{{ latestLog.date }}</span>
            <span class="ann-log-ver">{{ latestLog.version }}</span>
            <span class="ann-log-tag" :style="{ background: tagColor[latestLog.tag] }">
              {{ tagLabel[latestLog.tag] }}
            </span>
          </div>
          <p class="ann-log-title">{{ latestLog.title }}</p>
          <ul class="ann-log-list">
            <li v-for="(d, i) in latestLog.details" :key="i">{{ d }}</li>
          </ul>
        </div>

        <router-link to="/changelog" class="ann-link" @click="visible = false">
          查看完整更新日志 →
        </router-link>
      </div>

      <!-- fixed bottom actions -->
      <div class="ann-footer">
        <label class="ann-skip-label">
          <input v-model="skipPeriod" type="checkbox" class="ann-skip-check" />
          <span>近期不再弹出</span>
        </label>
        <a-button type="primary" @click="dismiss">确定</a-button>
      </div>
    </div>
  </a-modal>
</template>

<style scoped>
.ann-body {
  display: flex;
  flex-direction: column;
  text-align: center;
  max-height: 72vh;
}

.ann-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 12px 4px 4px;
}

.ann-header {
  flex-shrink: 0;
  padding: 4px 4px 12px;
  border-bottom: 1px solid var(--border-subtle);
  text-align: center;
}

.ann-title {
  margin: 0 0 4px;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
}

.ann-sub {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--text-tertiary);
}

.ann-qrcode {
  width: 140px;
  height: 140px;
  margin: 0 auto 12px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  background: var(--color-fill-1);
}

.qrcode-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.ann-divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.ann-divider::before,
.ann-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-subtle);
}

.ann-divider-text {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--text-tertiary);
  text-transform: uppercase;
}

.ann-log {
  text-align: left;
  background: var(--color-fill-1);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  margin-bottom: 10px;
}

.ann-log-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}

.ann-log-date {
  font-size: 0.6875rem;
  color: var(--text-tertiary);
  font-family: ui-monospace, monospace;
}

.ann-log-ver {
  font-size: 0.625rem;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 1px 5px;
  background: var(--color-fill-2);
  border-radius: 3px;
}

.ann-log-tag {
  font-size: 0.625rem;
  font-weight: 600;
  color: #fff;
  padding: 1px 6px;
  border-radius: 3px;
}

.ann-log-title {
  margin: 0 0 6px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.ann-log-list {
  margin: 0;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ann-log-list li {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.ann-link {
  display: inline-block;
  font-size: 0.8125rem;
  color: var(--brand-500);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--duration-fast) ease;
}

.ann-link:hover {
  color: var(--brand-600);
}

/* fixed footer */
.ann-footer {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 4px 4px;
  border-top: 1px solid var(--border-subtle);
  background: var(--surface);
}

.ann-skip-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: var(--text-tertiary);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

.ann-skip-check {
  width: 14px;
  height: 14px;
  accent-color: var(--brand-500);
  cursor: pointer;
}

@media (max-width: 480px) {
  .ann-scroll {
    padding: 4px 0 0;
  }

  .ann-qrcode {
    width: 120px;
    height: 120px;
  }

  .ann-title {
    font-size: 1rem;
  }
}
</style>

<style>
.announce-modal .arco-modal {
  max-width: 95vw !important;
}
</style>
