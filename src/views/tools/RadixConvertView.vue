<script setup lang="ts">
import { ref } from 'vue'

type Radix = 2 | 8 | 10 | 16

const input = ref('')
const fromRadix = ref<Radix>(10)
const results = ref<Record<string, string>>({})
const error = ref('')

const targets: { radix: Radix; label: string }[] = [
  { radix: 2, label: '二进制' },
  { radix: 8, label: '八进制' },
  { radix: 10, label: '十进制' },
  { radix: 16, label: '十六进制' },
]

function parseInput(value: string, radix: Radix): bigint | null {
  let s = value.trim().replace(/\s/g, '')
  if (!s) return null

  const neg = s.startsWith('-')
  if (s.startsWith('-') || s.startsWith('+')) s = s.slice(1)
  if (radix === 16 && /^0x/i.test(s)) s = s.slice(2)

  const patterns: Record<Radix, RegExp> = {
    2: /^[01]+$/,
    8: /^[0-7]+$/,
    10: /^[0-9]+$/,
    16: /^[0-9a-fA-F]+$/,
  }
  if (!patterns[radix].test(s)) return null

  const prefix: Record<Radix, string> = { 2: '0b', 8: '0o', 10: '', 16: '0x' }
  try {
    const n = BigInt(prefix[radix] + s)
    return neg ? -n : n
  } catch {
    return null
  }
}

function convert() {
  error.value = ''
  results.value = {}
  if (!input.value.trim()) {
    error.value = '请输入数值'
    return
  }
  const num = parseInput(input.value, fromRadix.value)
  if (num === null) {
    error.value = `无效的 ${fromRadix.value} 进制输入`
    return
  }
  const out: Record<string, string> = {}
  for (const t of targets) {
    if (t.radix === fromRadix.value) continue
    out[t.label] = num.toString(t.radix).toUpperCase()
  }
  results.value = out
}

function copy(value: string) {
  if (value) navigator.clipboard.writeText(value)
}

function clearAll() {
  input.value = ''
  results.value = {}
  error.value = ''
}
</script>

<template>
  <div class="tool-page">
    <a-space direction="vertical" :size="12" fill>
      <div>
        <div class="tool-label">输入进制</div>
        <a-radio-group v-model="fromRadix" type="button">
          <a-radio :value="2">二进制</a-radio>
          <a-radio :value="8">八进制</a-radio>
          <a-radio :value="10">十进制</a-radio>
          <a-radio :value="16">十六进制</a-radio>
        </a-radio-group>
      </div>

      <a-input
        v-model="input"
        :placeholder="fromRadix === 16 ? '例如 FF 或 0xFF' : '输入数值…'"
        allow-clear
      />

      <div class="tool-actions">
        <a-button type="primary" @click="convert">转换</a-button>
        <a-button type="text" @click="clearAll">清空</a-button>
      </div>

      <a-alert v-if="error" type="error">{{ error }}</a-alert>

      <div v-if="Object.keys(results).length" class="result-list">
        <div v-for="(value, label) in results" :key="label" class="result-item">
          <span class="result-label">{{ label }}</span>
          <code class="result-value">{{ value }}</code>
          <a-button type="text" size="small" @click="copy(value)">复制</a-button>
        </div>
      </div>
    </a-space>
  </div>
</template>

<style scoped>
.result-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: var(--brand-gradient-subtle);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
}

.result-label {
  flex-shrink: 0;
  width: 72px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.result-value {
  flex: 1;
  font-family: ui-monospace, 'Cascadia Code', monospace;
  font-size: 0.875rem;
  word-break: break-all;
}
</style>
