<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const loading = ref(true)
const progress = ref(0)

const messages = [
  '正在初始化引擎...',
  '加载工具模块...',
  '校准编解码器...',
  '组装文本处理器...',
  '部署安全组件...',
  '即将就绪...',
]

const currentMsg = computed(() => {
  const p = progress.value
  if (p < 10) return messages[0]
  if (p < 30) return messages[1]
  if (p < 50) return messages[2]
  if (p < 70) return messages[3]
  if (p < 90) return messages[4]
  return messages[5]
})

onMounted(() => {
  // staged fake-loading with small pauses
  const stages = [
    { target: 12, dur: 400 },
    { target: 18, dur: 200 },
    { target: 35, dur: 500 },
    { target: 42, dur: 200 },
    { target: 60, dur: 500 },
    { target: 68, dur: 200 },
    { target: 85, dur: 400 },
    { target: 92, dur: 250 },
    { target: 98, dur: 400 },
    { target: 100, dur: 600 },
  ]

  let i = 0
  let prev = 0

  function runStage() {
    if (i >= stages.length) {
      setTimeout(() => {
        loading.value = false
      }, 500)
      return
    }

    const { target, dur } = stages[i]
    const start = performance.now()
    const from = prev

    function tick(now: number) {
      const elapsed = now - start
      const t = Math.min(elapsed / dur, 1)
      const eased = 1 - (1 - t) ** 2
      progress.value = Math.round(from + (target - from) * eased)
      if (t < 1) {
        requestAnimationFrame(tick)
      } else {
        prev = target
        i++
        runStage()
      }
    }

    requestAnimationFrame(tick)
  }

  runStage()
})
</script>

<template>
  <transition name="loader-fade">
    <div v-if="loading" class="loader-overlay">
      <!-- bg orbs -->
      <div class="loader-bg">
        <span class="bg-orb orb-1" />
        <span class="bg-orb orb-2" />
        <span class="bg-orb orb-3" />
      </div>

      <div class="loader-content">
        <!-- brand mark -->
        <div class="loader-mark">
          <img src="/logo.png" alt="logo" class="mark-logo" />
          <span class="mark-glow" />
        </div>

        <!-- text -->
        <p class="loader-brand">码艺坊</p>
        <p class="loader-title">码艺坊在线工具箱</p>

        <!-- progress track -->
        <div class="loader-bar-wrap">
          <div class="loader-track">
            <span class="track-bar" :style="{ width: progress + '%' }">
              <span class="track-shimmer" />
            </span>
            <span class="track-glow" :style="{ left: progress + '%' }" />
          </div>
          <div class="loader-dots">
            <span
              v-for="d in 5"
              :key="d"
              class="ldot"
              :class="{ filled: progress >= d * 20 }"
            />
          </div>
        </div>
        <p class="loader-hint">{{ currentMsg }}</p>
      </div>
    </div>
  </transition>

  <router-view />
</template>

<style>
.loader-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  overflow: hidden;
}

/* ── animated bg orbs ────────────────────── */
.loader-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  animation: orb-drift 4s ease-in-out infinite alternate;
}

.orb-1 {
  width: 320px;
  height: 320px;
  top: -10%;
  left: 30%;
  background: rgb(99 102 241 / 20%);
  animation-delay: 0s;
}

.orb-2 {
  width: 260px;
  height: 260px;
  top: 55%;
  right: -8%;
  background: rgb(139 92 246 / 16%);
  animation-delay: -1.3s;
}

.orb-3 {
  width: 220px;
  height: 220px;
  bottom: -5%;
  left: 10%;
  background: rgb(59 130 246 / 14%);
  animation-delay: -2.6s;
}

@keyframes orb-drift {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(30px, -24px) scale(1.12);
  }
}

/* ── brand mark ──────────────────────────── */
.loader-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.loader-mark {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  margin-bottom: 22px;
  animation: mark-pulse 2s ease-in-out infinite;
}

.mark-logo {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  object-fit: contain;
  position: relative;
  z-index: 1;
}

.mark-glow {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--brand-gradient);
  filter: blur(20px);
  opacity: 0.3;
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes mark-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(1.15); }
}

/* ── text ────────────────────────────────── */
.loader-brand {
  margin: 0 0 2px;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--text-primary);
  animation: text-in 0.6s var(--ease-out) both;
  animation-delay: 0.1s;
}

.loader-title {
  margin: 0 0 24px;
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--text-tertiary);
  animation: text-in 0.6s var(--ease-out) both;
  animation-delay: 0.25s;
}

@keyframes text-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── progress track ──────────────────────── */
.loader-bar-wrap {
  width: 220px;
  margin: 0 auto 12px;
}

.loader-track {
  position: relative;
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background: var(--border-subtle);
  overflow: hidden;
}

.track-bar {
  position: relative;
  display: block;
  height: 100%;
  border-radius: 4px;
  background: var(--brand-gradient);
  transition: width 0.2s ease;
  overflow: hidden;
}

.track-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgb(255 255 255 / 50%) 40%,
    rgb(255 255 255 / 70%) 50%,
    rgb(255 255 255 / 50%) 60%,
    transparent 100%
  );
  animation: shimmer 1.2s ease-in-out infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

.track-glow {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  margin-left: -6px;
  margin-top: -6px;
  border-radius: 50%;
  background: var(--brand-500);
  box-shadow:
    0 0 8px rgb(99 102 241 / 60%),
    0 0 20px rgb(99 102 241 / 30%);
  transition: left 0.2s ease;
  pointer-events: none;
}

.loader-dots {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  padding: 0 4px;
}

.ldot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--border-default);
  transition:
    background var(--duration-fast) ease,
    box-shadow var(--duration-fast) ease;
}

.ldot.filled {
  background: var(--brand-500);
  box-shadow: 0 0 6px rgb(99 102 241 / 40%);
}

.loader-hint {
  margin: 10px 0 0;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-tertiary);
  min-height: 1.2em;
}

/* ── exit transition ─────────────────────── */
.loader-fade-leave-active {
  transition: opacity 0.45s ease;
}

.loader-fade-leave-to {
  opacity: 0;
}
</style>
