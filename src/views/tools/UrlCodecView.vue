<script setup lang="ts">
import { ref } from 'vue'

const raw = ref('')
const encoded = ref('')
const error = ref('')

function encodeUrl() {
  error.value = ''
  try {
    encoded.value = encodeURIComponent(raw.value)
  } catch (e) {
    error.value = e instanceof Error ? e.message : '编码失败'
  }
}

function decodeUrl() {
  error.value = ''
  try {
    raw.value = decodeURIComponent(encoded.value.trim())
  } catch {
    error.value = '无效的 URL 编码字符串，请检查 % 转义是否完整'
  }
}

function copy(field: 'raw' | 'encoded') {
  const value = field === 'raw' ? raw.value : encoded.value
  if (value) navigator.clipboard.writeText(value)
}

function clearAll() {
  raw.value = ''
  encoded.value = ''
  error.value = ''
}
</script>

<template>
  <div class="tool-page">
    <a-space direction="vertical" :size="16" fill>
      <div class="tool-field">
        <div class="tool-label">原文</div>
        <a-textarea
          v-model="raw"
          placeholder="输入要编码的文本或 URL…"
          allow-clear
          :auto-size="{ minRows: 5 }"
        />
      </div>

      <div class="tool-actions">
        <a-button type="primary" @click="encodeUrl">编码 →</a-button>
        <a-button type="primary" @click="decodeUrl">← 解码</a-button>
        <a-button type="outline" @click="copy('raw')">复制原文</a-button>
        <a-button type="outline" @click="copy('encoded')">复制编码结果</a-button>
        <a-button type="text" @click="clearAll">清空</a-button>
      </div>

      <a-alert v-if="error" type="error">{{ error }}</a-alert>

      <div class="tool-field">
        <div class="tool-label">URL 编码结果</div>
        <a-textarea
          v-model="encoded"
          placeholder="encodeURIComponent 结果…"
          allow-clear
          :auto-size="{ minRows: 5 }"
        />
      </div>
    </a-space>
  </div>
</template>
