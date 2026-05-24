<script setup lang="ts">
import { ref } from 'vue'
import QRCode from 'qrcode'

const text = ref('')
const qrcodeDataUrl = ref('')
const canvasRef = ref<HTMLCanvasElement | null>(null)

async function generate() {
  if (!text.value.trim()) return
  if (!canvasRef.value) return
  try {
    await QRCode.toCanvas(canvasRef.value, text.value, {
      width: 256,
      margin: 2,
      color: { dark: '#0f172a', light: '#ffffff' },
    })
    qrcodeDataUrl.value = canvasRef.value.toDataURL('image/png')
  } catch {
    // invalid input, ignore
  }
}

function download() {
  if (!qrcodeDataUrl.value) return
  const a = document.createElement('a')
  a.href = qrcodeDataUrl.value
  a.download = 'qrcode.png'
  a.click()
}
</script>

<template>
  <div class="tool-page">
    <a-space direction="vertical" :size="16" fill>
      <div>
        <p class="tool-label">输入文本或链接</p>
        <a-textarea
          v-model="text"
          class="tool-field"
          placeholder="输入要生成二维码的文本或 URL……"
          :auto-size="{ minRows: 2, maxRows: 4 }"
          allow-clear
        />
      </div>

      <div class="tool-actions">
        <a-button type="primary" :disabled="!text.trim()" @click="generate">生成二维码</a-button>
        <a-button type="outline" :disabled="!qrcodeDataUrl" @click="download">下载图片</a-button>
      </div>

      <div class="qrcode-preview">
        <canvas
          ref="canvasRef"
          class="qrcode-canvas"
          :class="{ hidden: !qrcodeDataUrl }"
        />
        <p v-if="!qrcodeDataUrl" class="qrcode-placeholder">输入内容后点击生成</p>
      </div>
    </a-space>
  </div>
</template>

<style scoped>
.qrcode-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 16px;
  background: var(--color-fill-1);
  border-radius: var(--radius-md);
  border: 1px dashed var(--border-default);
}

.qrcode-canvas {
  display: block;
  max-width: 100%;
  border-radius: var(--radius-sm);
}

.qrcode-canvas.hidden {
  display: none;
}

.qrcode-placeholder {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-tertiary);
}
</style>
