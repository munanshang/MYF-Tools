<script setup lang="ts">
import { ref } from 'vue'
import { md5, sha1, sha256 } from '../../utils/hash'

const input = ref('')
const md5Result = ref('')
const sha1Result = ref('')
const sha256Result = ref('')
const error = ref('')
const loading = ref(false)

async function compute() {
  error.value = ''
  md5Result.value = ''
  sha1Result.value = ''
  sha256Result.value = ''
  if (!input.value) {
    error.value = '请输入要计算哈希的文本'
    return
  }
  loading.value = true
  try {
    md5Result.value = md5(input.value)
    sha1Result.value = await sha1(input.value)
    sha256Result.value = await sha256(input.value)
  } catch (e) {
    error.value = e instanceof Error ? e.message : '哈希计算失败'
  } finally {
    loading.value = false
  }
}

function copy(value: string) {
  if (value) navigator.clipboard.writeText(value)
}

function clearAll() {
  input.value = ''
  md5Result.value = ''
  sha1Result.value = ''
  sha256Result.value = ''
  error.value = ''
}
</script>

<template>
  <div class="tool-page">
    <a-space direction="vertical" :size="12" fill>
      <a-textarea
        v-model="input"
        placeholder="输入文本…"
        allow-clear
        :auto-size="{ minRows: 6 }"
      />

      <div class="tool-actions">
        <a-button type="primary" :loading="loading" @click="compute">计算哈希</a-button>
        <a-button type="text" @click="clearAll">清空</a-button>
      </div>

      <a-alert v-if="error" type="error">{{ error }}</a-alert>

      <template v-if="md5Result || sha1Result || sha256Result">
        <div class="hash-row">
          <div class="tool-label">MD5</div>
          <div class="hash-value">
            <code>{{ md5Result }}</code>
            <a-button type="text" size="small" @click="copy(md5Result)">复制</a-button>
          </div>
        </div>
        <div class="hash-row">
          <div class="tool-label">SHA-1</div>
          <div class="hash-value">
            <code>{{ sha1Result }}</code>
            <a-button type="text" size="small" @click="copy(sha1Result)">复制</a-button>
          </div>
        </div>
        <div class="hash-row">
          <div class="tool-label">SHA-256</div>
          <div class="hash-value">
            <code>{{ sha256Result }}</code>
            <a-button type="text" size="small" @click="copy(sha256Result)">复制</a-button>
          </div>
        </div>
      </template>
    </a-space>
  </div>
</template>

<style scoped>
.hash-row {
  margin-top: 4px;
}

.hash-value {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 12px;
  background: var(--brand-gradient-subtle);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
}

.hash-value code {
  flex: 1;
  font-family: ui-monospace, 'Cascadia Code', monospace;
  font-size: 0.8125rem;
  word-break: break-all;
  line-height: 1.5;
  color: var(--text-primary);
}
</style>
