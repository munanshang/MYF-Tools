<script setup lang="ts">
import { ref, computed } from 'vue'

const text = ref('')
const model = ref('gpt-4')

interface ModelInfo {
  name: string
  label: string
  priceInput: string
  priceOutput: string
}

const models: ModelInfo[] = [
  { name: 'gpt-4', label: 'GPT-4 / GPT-4o', priceInput: '$2.50', priceOutput: '$10.00' },
  { name: 'gpt-4o-mini', label: 'GPT-4o-mini', priceInput: '$0.15', priceOutput: '$0.60' },
  { name: 'gpt-3.5', label: 'GPT-3.5 Turbo', priceInput: '$0.50', priceOutput: '$1.50' },
  { name: 'claude-opus', label: 'Claude Opus 4', priceInput: '$15.00', priceOutput: '$75.00' },
  { name: 'claude-sonnet', label: 'Claude Sonnet 4', priceInput: '$3.00', priceOutput: '$15.00' },
  { name: 'claude-haiku', label: 'Claude Haiku 4.5', priceInput: '$0.80', priceOutput: '$4.00' },
]

const selectedModel = computed(() => models.find((m) => m.name === model.value)!)

function countTokens(str: string): number {
  if (!str.trim()) return 0

  // Chinese/Japanese/Korean characters
  const cjk = (str.match(/[一-鿿㐀-䶿぀-ゟ゠-ヿ가-힯]/g) || []).length
  const nonCjk = str.length - cjk

  // CJK: ~1.5 chars per token, English: ~4 chars per token
  const cjkTokens = cjk / 1.5
  const nonCjkTokens = nonCjk / 4

  // Account for spaces and punctuation
  const spaces = (str.match(/\s+/g) || []).length
  const punctuation = (str.match(/[.,!?;:'"()\[\]{}，。！？；：""''（）【】《》]/g) || []).length

  return Math.max(1, Math.round(cjkTokens + nonCjkTokens - spaces * 0.5 + punctuation * 0.3))
}

const tokens = computed(() => {
  const input = countTokens(text.value)
  return {
    input,
    output: 0,
    total: input,
  }
})

const cost = computed(() => {
  const pricePer1K = selectedModel.value.priceInput
  const price = parseFloat(pricePer1K.replace('$', ''))
  return ((tokens.value.total / 1000) * price).toFixed(4)
})
</script>

<template>
  <div class="tool-page">
    <a-space direction="vertical" :size="14" fill>
      <div>
        <p class="tool-label">选择模型</p>
        <a-select v-model="model" class="token-select">
          <a-option v-for="m in models" :key="m.name" :value="m.name">
            <div class="model-opt">
              <span>{{ m.label }}</span>
              <span class="model-price">in {{ m.priceInput }} / out {{ m.priceOutput }}</span>
            </div>
          </a-option>
        </a-select>
      </div>

      <div>
        <p class="tool-label">输入文本</p>
        <a-textarea
          v-model="text"
          class="tool-field"
          placeholder="输入或粘贴文本，自动估算 Token……"
          :auto-size="{ minRows: 6, maxRows: 14 }"
          allow-clear
        />
      </div>

      <div class="token-grid">
        <div class="token-card">
          <span class="token-val">{{ tokens.input.toLocaleString() }}</span>
          <span class="token-label">输入 Tokens</span>
        </div>
        <div class="token-card">
          <span class="token-val">{{ tokens.total.toLocaleString() }}</span>
          <span class="token-label">总计 Tokens</span>
        </div>
        <div class="token-card">
          <span class="token-val">~{{ cost }}</span>
          <span class="token-label">估算费用 (USD)</span>
        </div>
      </div>

      <a-alert type="info" class="token-note">
        基于字符数近似估算，实际 Token 数可能因分词器差异略有不同。中文约 1.5 字符/Token，英文约 4 字符/Token。
      </a-alert>
    </a-space>
  </div>
</template>

<style scoped>
.token-select {
  width: 100%;
}

.model-opt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.model-price {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  font-family: ui-monospace, monospace;
}

.token-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.token-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 8px;
  background: var(--color-fill-1);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
}

.token-val {
  font-size: 1.25rem;
  font-weight: 700;
  font-family: ui-monospace, monospace;
  color: var(--brand-600);
  margin-bottom: 4px;
}

.token-label {
  font-size: 0.6875rem;
  color: var(--text-tertiary);
  letter-spacing: 0.02em;
}

.token-note {
  border-radius: var(--radius-sm) !important;
  font-size: 0.8125rem !important;
}

@media (max-width: 480px) {
  .token-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
