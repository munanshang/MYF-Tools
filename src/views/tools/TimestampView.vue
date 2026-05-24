<script setup lang="ts">
import { ref } from 'vue'

const timestampSec = ref('')
const timestampMs = ref('')
const datetimeLocal = ref('')
const error = ref('')

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function formatDate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

function secToDate() {
  error.value = ''
  const sec = Number(timestampSec.value.trim())
  if (!Number.isFinite(sec)) {
    error.value = '请输入有效的秒级时间戳'
    return
  }
  const d = new Date(sec * 1000)
  timestampMs.value = String(sec * 1000)
  datetimeLocal.value = formatDate(d)
}

function msToDate() {
  error.value = ''
  const ms = Number(timestampMs.value.trim())
  if (!Number.isFinite(ms)) {
    error.value = '请输入有效的毫秒级时间戳'
    return
  }
  const d = new Date(ms)
  timestampSec.value = String(Math.floor(ms / 1000))
  datetimeLocal.value = formatDate(d)
}

function dateToTimestamp() {
  error.value = ''
  const normalized = datetimeLocal.value.trim().replace(' ', 'T')
  const d = new Date(normalized)
  if (Number.isNaN(d.getTime())) {
    error.value = '日期格式无效，请使用 YYYY-MM-DD HH:mm:ss'
    return
  }
  timestampSec.value = String(Math.floor(d.getTime() / 1000))
  timestampMs.value = String(d.getTime())
}

function useNow() {
  error.value = ''
  const now = Date.now()
  timestampMs.value = String(now)
  timestampSec.value = String(Math.floor(now / 1000))
  datetimeLocal.value = formatDate(new Date(now))
}
</script>

<template>
  <div class="tool-page">
    <a-space direction="vertical" :size="16" fill>
      <a-button type="primary" long @click="useNow">使用当前时间</a-button>

      <div class="tool-field">
        <div class="tool-label">秒级时间戳</div>
        <a-input v-model="timestampSec" placeholder="例如 1716566400" allow-clear />
        <a-button class="field-btn" long type="outline" @click="secToDate">秒 → 日期</a-button>
      </div>

      <div class="tool-field">
        <div class="tool-label">毫秒级时间戳</div>
        <a-input v-model="timestampMs" placeholder="例如 1716566400000" allow-clear />
        <a-button class="field-btn" long type="outline" @click="msToDate">毫秒 → 日期</a-button>
      </div>

      <div class="tool-field">
        <div class="tool-label">本地日期时间</div>
        <a-input v-model="datetimeLocal" placeholder="YYYY-MM-DD HH:mm:ss" allow-clear />
        <a-button class="field-btn" long type="outline" @click="dateToTimestamp">
          日期 → 时间戳
        </a-button>
      </div>

      <a-alert v-if="error" type="error">{{ error }}</a-alert>
    </a-space>
  </div>
</template>
