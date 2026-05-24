<script setup lang="ts">
import { ref } from 'vue'

const count = ref(1)
const uuids = ref<string[]>([])

function generateUuid(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function generate() {
  uuids.value = Array.from({ length: count.value }, () => generateUuid())
}

function copyOne(id: string) {
  navigator.clipboard.writeText(id)
}

function copyAll() {
  if (uuids.value.length) {
    navigator.clipboard.writeText(uuids.value.join('\n'))
  }
}

function clearAll() {
  uuids.value = []
}
</script>

<template>
  <div class="tool-page">
    <a-space direction="vertical" :size="12" fill>
      <div class="tool-actions">
        <span class="count-label">生成数量：</span>
        <a-radio-group v-model="count" type="button">
          <a-radio :value="1">1 个</a-radio>
          <a-radio :value="5">5 个</a-radio>
          <a-radio :value="10">10 个</a-radio>
        </a-radio-group>
      </div>

      <div class="tool-actions">
        <a-button type="primary" @click="generate">生成 UUID v4</a-button>
        <a-button type="outline" :disabled="!uuids.length" @click="copyAll">一键复制</a-button>
        <a-button type="text" @click="clearAll">清空</a-button>
      </div>

      <div v-if="uuids.length" class="uuid-list">
        <div v-for="(id, index) in uuids" :key="index" class="uuid-item">
          <code>{{ id }}</code>
          <a-button type="text" size="small" @click="copyOne(id)">复制</a-button>
        </div>
      </div>
    </a-space>
  </div>
</template>

<style scoped>
.count-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.uuid-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.uuid-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  background: var(--brand-gradient-subtle);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
}

.uuid-item code {
  font-family: ui-monospace, 'Cascadia Code', monospace;
  font-size: 0.875rem;
  word-break: break-all;
  color: var(--text-primary);
}
</style>
