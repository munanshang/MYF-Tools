<script setup lang="ts">
import { ref, computed } from 'vue'

const r = ref(99)
const g = ref(102)
const b = ref(241)

function clamp(v: number) {
  return Math.max(0, Math.min(255, v))
}

const hexDisplay = computed(() => {
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, '0')
  return `#${toHex(r.value)}${toHex(g.value)}${toHex(b.value)}`
})

const rgbDisplay = computed(() => `rgb(${r.value}, ${g.value}, ${b.value})`)

const hslDisplay = computed(() => {
  const nr = r.value / 255
  const ng = g.value / 255
  const nb = b.value / 255
  const max = Math.max(nr, ng, nb)
  const min = Math.min(nr, ng, nb)
  const l = (max + min) / 2

  if (max === min) return `hsl(0, 0%, ${Math.round(l * 100)}%)`

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  switch (max) {
    case nr:
      h = ((ng - nb) / d + (ng < nb ? 6 : 0)) / 6
      break
    case ng:
      h = ((nb - nr) / d + 2) / 6
      break
    case nb:
      h = ((nr - ng) / d + 4) / 6
      break
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
})

function onRChange(v: number) { r.value = clamp(v) }
function onGChange(v: number) { g.value = clamp(v) }
function onBChange(v: number) { b.value = clamp(v) }

function onPickerInput(e: Event) {
  const hex = (e.target as HTMLInputElement).value
  r.value = parseInt(hex.slice(1, 3), 16)
  g.value = parseInt(hex.slice(3, 5), 16)
  b.value = parseInt(hex.slice(5, 7), 16)
}

function copy(v: string) {
  navigator.clipboard.writeText(v)
}
</script>

<template>
  <div class="tool-page">
    <a-space direction="vertical" :size="16" fill>
      <div class="color-top">
        <div class="color-swatch" :style="{ background: hexDisplay }">
          <input
            type="color"
            :value="hexDisplay"
            class="native-picker"
            @input="onPickerInput"
          />
        </div>
        <div class="color-hex-row">
          <p class="tool-label">HEX</p>
          <div class="hex-input-wrap">
            <span class="hex-prefix">#</span>
            <span class="hex-value">{{ hexDisplay.slice(1) }}</span>
          </div>
        </div>
      </div>

      <div>
        <p class="tool-label">RGB 滑块</p>
        <div class="color-sliders">
          <div class="slider-row">
            <span class="slider-label r">R</span>
            <a-input-number v-model="r" :min="0" :max="255" size="small" @change="onRChange" />
            <a-slider v-model="r" :min="0" :max="255" @change="onRChange" />
          </div>
          <div class="slider-row">
            <span class="slider-label g">G</span>
            <a-input-number v-model="g" :min="0" :max="255" size="small" @change="onGChange" />
            <a-slider v-model="g" :min="0" :max="255" @change="onGChange" />
          </div>
          <div class="slider-row">
            <span class="slider-label b">B</span>
            <a-input-number v-model="b" :min="0" :max="255" size="small" @change="onBChange" />
            <a-slider v-model="b" :min="0" :max="255" @change="onBChange" />
          </div>
        </div>
      </div>

      <div>
        <p class="tool-label">格式值（点击复制）</p>
        <div class="format-list">
          <div
            v-for="f in [
              { label: 'HEX', value: hexDisplay },
              { label: 'RGB', value: rgbDisplay },
              { label: 'HSL', value: hslDisplay },
            ]"
            :key="f.label"
            class="format-row"
            @click="copy(f.value)"
          >
            <span class="format-label">{{ f.label }}</span>
            <code class="format-value">{{ f.value }}</code>
            <a-button type="text" size="small" @click.stop="copy(f.value)">复制</a-button>
          </div>
        </div>
      </div>
    </a-space>
  </div>
</template>

<style scoped>
.color-top {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.color-swatch {
  flex-shrink: 0;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  cursor: pointer;
}

.native-picker {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  opacity: 0;
  cursor: pointer;
}

.color-hex-row {
  flex: 1;
  min-width: 0;
}

.hex-input-wrap {
  display: flex;
  align-items: center;
  height: 36px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--color-fill-1);
}

.hex-prefix {
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-tertiary);
  background: var(--color-fill-2);
  border-right: 1px solid var(--border-default);
  height: 100%;
}

.hex-value {
  flex: 1;
  padding: 0 10px;
  font-family: ui-monospace, 'Cascadia Code', monospace;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
}

.color-sliders {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.slider-label {
  flex-shrink: 0;
  width: 20px;
  text-align: center;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-tertiary);
}

.slider-label.r { color: #ef4444; }
.slider-label.g { color: #22c55e; }
.slider-label.b { color: #3b82f6; }

.slider-row :deep(.arco-input-number) {
  width: 72px;
  flex-shrink: 0;
}

.slider-row :deep(.arco-slider) {
  flex: 1;
}

.format-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.format-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: var(--color-fill-1);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--duration-fast) ease;
}

.format-row:hover {
  background: var(--brand-gradient-subtle);
}

.format-label {
  flex-shrink: 0;
  width: 36px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-tertiary);
}

.format-value {
  flex: 1;
  font-family: ui-monospace, 'Cascadia Code', monospace;
  font-size: 0.875rem;
  color: var(--text-primary);
  word-break: break-all;
}
</style>
