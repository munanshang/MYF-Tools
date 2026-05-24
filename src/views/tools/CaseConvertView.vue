<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')
const output = ref('')

function splitWords(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_\s]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase())
}

function toUpper() {
  output.value = input.value.toUpperCase()
}

function toLower() {
  output.value = input.value.toLowerCase()
}

function toTitle() {
  output.value = input.value.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
}

function toCamel() {
  const words = splitWords(input.value)
  if (!words.length) {
    output.value = ''
    return
  }
  output.value =
    words[0] +
    words
      .slice(1)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join('')
}

function toPascal() {
  const words = splitWords(input.value)
  output.value = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('')
}

function toSnake() {
  output.value = splitWords(input.value).join('_')
}

function toKebab() {
  output.value = splitWords(input.value).join('-')
}

function copyOutput() {
  if (output.value) navigator.clipboard.writeText(output.value)
}

function clearAll() {
  input.value = ''
  output.value = ''
}
</script>

<template>
  <div class="tool-page">
    <a-space direction="vertical" :size="12" fill>
      <a-textarea
        v-model="input"
        placeholder="输入要转换的文本…"
        allow-clear
        :auto-size="{ minRows: 5 }"
      />

      <div class="tool-actions">
        <a-button type="primary" @click="toUpper">全大写</a-button>
        <a-button @click="toLower">全小写</a-button>
        <a-button @click="toTitle">标题大小写</a-button>
        <a-button @click="toCamel">驼峰 camelCase</a-button>
        <a-button @click="toPascal">帕斯卡 PascalCase</a-button>
        <a-button @click="toSnake">蛇形 snake_case</a-button>
        <a-button @click="toKebab">短横 kebab-case</a-button>
      </div>

      <div class="tool-actions">
        <a-button type="outline" :disabled="!output" @click="copyOutput">复制结果</a-button>
        <a-button type="text" @click="clearAll">清空</a-button>
      </div>

      <div v-if="output !== '' || input">
        <div class="tool-label">转换结果</div>
        <a-textarea
          v-model="output"
          readonly
          placeholder="转换结果将显示在这里…"
          :auto-size="{ minRows: 5 }"
        />
      </div>
    </a-space>
  </div>
</template>
