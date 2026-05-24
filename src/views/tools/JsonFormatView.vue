<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')
const output = ref('')
const error = ref('')
const indent = ref(2)

function formatJson() {
  error.value = ''
  output.value = ''
  if (!input.value.trim()) {
    error.value = '请输入 JSON 文本'
    return
  }
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed, null, indent.value)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'JSON 解析失败'
  }
}

function minifyJson() {
  error.value = ''
  output.value = ''
  if (!input.value.trim()) {
    error.value = '请输入 JSON 文本'
    return
  }
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'JSON 解析失败'
  }
}

function copyOutput() {
  if (output.value) {
    navigator.clipboard.writeText(output.value)
  }
}

function clearAll() {
  input.value = ''
  output.value = ''
  error.value = ''
}
</script>

<template>
  <div class="tool-page">
    <a-space direction="vertical" :size="16" fill>
      <div class="tool-field">
        <div class="tool-label">输入 JSON</div>
        <a-textarea
          v-model="input"
          placeholder="粘贴 JSON 到这里…"
          allow-clear
          :auto-size="{ minRows: 8 }"
        />
      </div>

      <div class="tool-actions">
        <a-button type="primary" @click="formatJson">格式化</a-button>
        <a-button @click="minifyJson">压缩</a-button>
        <a-button type="outline" @click="copyOutput">复制结果</a-button>
        <a-button type="text" @click="clearAll">清空</a-button>
      </div>

      <div class="tool-indent-row">
        <span>缩进空格</span>
        <a-input-number v-model="indent" :min="0" :max="8" />
      </div>

      <a-alert v-if="error" type="error">{{ error }}</a-alert>

      <div v-if="output" class="tool-field">
        <div class="tool-label">输出结果</div>
        <a-textarea
          v-model="output"
          readonly
          placeholder="输出结果"
          :auto-size="{ minRows: 10 }"
        />
      </div>
    </a-space>
  </div>
</template>
