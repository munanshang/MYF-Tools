<script setup lang="ts">
import { ref, computed } from 'vue'

const pattern = ref('')
const flags = ref('g')
const testStr = ref('')
const error = ref('')
const matches = ref<string[]>([])

const regex = computed(() => {
  error.value = ''
  if (!pattern.value) return null
  try {
    return new RegExp(pattern.value, flags.value)
  } catch (e) {
    error.value = (e as Error).message
    return null
  }
})

function runTest() {
  matches.value = []
  if (!regex.value || !testStr.value) return
  const r = regex.value
  if (!r.global) {
    const m = r.exec(testStr.value)
    if (m) {
      matches.value = [m[0], ...(m.length > 1 ? [`匹配组: ${m.slice(1).join(', ')}`] : [])]
    }
    return
  }
  const found = testStr.value.match(r)
  if (found) matches.value = found
}

function highlightMatch(text: string): string {
  if (!regex.value || !text) return text
  return text.replace(regex.value, (m) => `<mark class="hl">${m}</mark>`)
}

const highlighted = computed(() => highlightMatch(testStr.value))
</script>

<template>
  <div class="tool-page">
    <a-space direction="vertical" :size="14" fill>
      <div>
        <p class="tool-label">正则表达式</p>
        <a-input-group>
          <span class="regex-delim">/</span>
          <a-input v-model="pattern" class="regex-pattern" placeholder="正则表达式" allow-clear />
          <span class="regex-delim">/</span>
          <a-input v-model="flags" class="regex-flags" placeholder="g" :max-length="5" />
        </a-input-group>
        <p v-if="error" class="regex-err">{{ error }}</p>
      </div>

      <div>
        <p class="tool-label">测试文本</p>
        <a-textarea
          v-model="testStr"
          class="tool-field"
          placeholder="输入要匹配的文本……"
          :auto-size="{ minRows: 4, maxRows: 10 }"
          allow-clear
        />
      </div>

      <div class="tool-actions">
        <a-button type="primary" @click="runTest">测试匹配</a-button>
      </div>

      <div v-if="highlighted && matches.length" class="regex-preview">
        <p class="tool-label">高亮结果</p>
        <div class="regex-hl-text" v-html="highlighted" />
      </div>

      <div v-if="matches.length" class="regex-results">
        <p class="tool-label">
          匹配结果 <span class="regex-count">共 {{ matches.length }} 项</span>
        </p>
        <div class="match-list">
          <div v-for="(m, i) in matches" :key="i" class="match-item">
            <code>{{ m }}</code>
          </div>
        </div>
      </div>
    </a-space>
  </div>
</template>

<style scoped>
.regex-delim {
  display: flex;
  align-items: center;
  padding: 0 8px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-tertiary);
  background: var(--color-fill-2);
  border: 1px solid var(--border-default);
}

.regex-delim:first-child { border-radius: var(--radius-sm) 0 0 var(--radius-sm); border-right: 0; }
.regex-delim:last-of-type { border-radius: 0 var(--radius-sm) var(--radius-sm) 0; border-left: 0; }

.regex-pattern { border-radius: 0 !important; }
.regex-flags { width: 56px; flex-shrink: 0; border-radius: 0 !important; }

.regex-err {
  margin: 6px 0 0;
  font-size: 0.8125rem;
  color: #ef4444;
}

.regex-preview {
  margin-top: 4px;
}

.regex-hl-text {
  padding: 12px 14px;
  background: var(--color-fill-1);
  border-radius: var(--radius-sm);
  font-family: ui-monospace, monospace;
  font-size: 0.875rem;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-all;
}

.regex-hl-text :deep(.hl) {
  background: rgb(99 102 241 / 20%);
  color: var(--brand-600);
  border-radius: 2px;
  padding: 0 1px;
}

.regex-count {
  font-weight: 400;
  color: var(--text-tertiary);
  font-size: 0.8125rem;
}

.match-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.match-item {
  padding: 8px 12px;
  background: var(--brand-gradient-subtle);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
}

.match-item code {
  font-family: ui-monospace, monospace;
  font-size: 0.875rem;
  color: var(--text-primary);
  word-break: break-all;
}
</style>
