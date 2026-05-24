<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
const base64 = ref('')
const error = ref('')

function encode() {
  error.value = ''
  try {
    base64.value = btoa(unescape(encodeURIComponent(text.value)))
  } catch (e) {
    error.value = e instanceof Error ? e.message : '编码失败'
  }
}

function decode() {
  error.value = ''
  try {
    text.value = decodeURIComponent(escape(atob(base64.value.trim())))
  } catch (e) {
    error.value = '无效的 Base64 字符串'
  }
}

function copy(field: 'text' | 'base64') {
  const value = field === 'text' ? text.value : base64.value
  if (value) navigator.clipboard.writeText(value)
}

function clearAll() {
  text.value = ''
  base64.value = ''
  error.value = ''
}
</script>

<template>
  <div class="tool-page">
    <a-space direction="vertical" :size="16" fill>
      <div class="tool-field">
        <div class="tool-label">原文（UTF-8）</div>
        <a-textarea
          v-model="text"
          placeholder="输入要编码的文本…"
          allow-clear
          :auto-size="{ minRows: 5 }"
        />
      </div>

      <div class="tool-actions">
        <a-button type="primary" @click="encode">编码 →</a-button>
        <a-button type="primary" @click="decode">← 解码</a-button>
        <a-button type="outline" @click="copy('text')">复制原文</a-button>
        <a-button type="outline" @click="copy('base64')">复制 Base64</a-button>
        <a-button type="text" @click="clearAll">清空</a-button>
      </div>

      <a-alert v-if="error" type="error">{{ error }}</a-alert>

      <div class="tool-field">
        <div class="tool-label">Base64</div>
        <a-textarea
          v-model="base64"
          placeholder="Base64 结果…"
          allow-clear
          :auto-size="{ minRows: 5 }"
        />
      </div>
    </a-space>
  </div>
</template>
