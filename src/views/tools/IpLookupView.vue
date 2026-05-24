<script setup lang="ts">
import { ref } from 'vue'

interface IpInfo {
  ip: string
  city: string
  region: string
  country: string
  org: string
  timezone: string
}

const loading = ref(false)
const info = ref<IpInfo | null>(null)
const error = ref('')

async function lookup() {
  loading.value = true
  error.value = ''
  info.value = null
  try {
    const res = await fetch('https://ipapi.co/json/')
    if (!res.ok) throw new Error('请求失败')
    const data = await res.json()
    info.value = {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      org: data.org,
      timezone: data.timezone,
    }
  } catch {
    error.value = '查询失败，请检查网络后重试'
  } finally {
    loading.value = false
  }
}

function copy(v: string) {
  navigator.clipboard.writeText(v)
}
</script>

<template>
  <div class="tool-page">
    <a-space direction="vertical" :size="14" fill>
      <div class="tool-actions">
        <a-button type="primary" :loading="loading" @click="lookup">查询我的 IP</a-button>
      </div>

      <p v-if="error" class="ip-err">{{ error }}</p>

      <div v-if="info" class="ip-grid">
        <div v-for="item in [
          { label: 'IP 地址', value: info.ip },
          { label: '国家/地区', value: info.country },
          { label: '省份', value: info.region },
          { label: '城市', value: info.city },
          { label: '运营商', value: info.org },
          { label: '时区', value: info.timezone },
        ]" :key="item.label" class="ip-row">
          <span class="ip-label">{{ item.label }}</span>
          <code class="ip-value">{{ item.value || '-' }}</code>
          <a-button type="text" size="small" @click="copy(item.value)">复制</a-button>
        </div>
      </div>
    </a-space>
  </div>
</template>

<style scoped>
.ip-err {
  margin: 0;
  font-size: 0.8125rem;
  color: #ef4444;
}

.ip-grid {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ip-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: var(--color-fill-1);
  border-radius: var(--radius-sm);
}

.ip-label {
  flex-shrink: 0;
  width: 72px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-tertiary);
}

.ip-value {
  flex: 1;
  font-family: ui-monospace, monospace;
  font-size: 0.875rem;
  color: var(--text-primary);
}
</style>
