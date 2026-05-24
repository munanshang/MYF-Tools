<script setup lang="ts">
import { ref, computed } from 'vue'

const text = ref('')

const stats = computed(() => {
  const t = text.value
  if (!t.trim()) return { chars: 0, charsNoSpace: 0, words: 0, lines: 0, bytes: 0, paragraphs: 0 }

  const chars = t.length
  const charsNoSpace = t.replace(/\s/g, '').length
  const words = t.trim().split(/\s+/).length
  const lines = t.split('\n').length
  const bytes = new TextEncoder().encode(t).length
  const paragraphs = t.split(/\n\s*\n/).filter((p) => p.trim()).length

  return { chars, charsNoSpace, words, lines, bytes, paragraphs }
})

const rows = computed(() => [
  { label: '总字符数', value: stats.value.chars.toLocaleString() },
  { label: '不含空格', value: stats.value.charsNoSpace.toLocaleString() },
  { label: '单词数', value: stats.value.words.toLocaleString() },
  { label: '行数', value: stats.value.lines.toLocaleString() },
  { label: '段落数', value: stats.value.paragraphs.toLocaleString() },
  { label: '字节数 (UTF-8)', value: stats.value.bytes.toLocaleString() },
])
</script>

<template>
  <div class="tool-page">
    <a-space direction="vertical" :size="14" fill>
      <div>
        <p class="tool-label">输入文本</p>
        <a-textarea
          v-model="text"
          class="tool-field"
          placeholder="输入或粘贴文本，自动统计……"
          :auto-size="{ minRows: 6, maxRows: 16 }"
          allow-clear
        />
      </div>

      <div class="wc-grid">
        <div v-for="r in rows" :key="r.label" class="wc-card">
          <span class="wc-val">{{ r.value }}</span>
          <span class="wc-label">{{ r.label }}</span>
        </div>
      </div>
    </a-space>
  </div>
</template>

<style scoped>
.wc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.wc-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 8px;
  background: var(--color-fill-1);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
}

.wc-val {
  font-size: 1.25rem;
  font-weight: 700;
  font-family: ui-monospace, monospace;
  color: var(--brand-600);
  margin-bottom: 4px;
}

.wc-label {
  font-size: 0.6875rem;
  color: var(--text-tertiary);
  letter-spacing: 0.02em;
}

@media (max-width: 480px) {
  .wc-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
