<script setup lang="ts">
import { ref } from 'vue'

const tab = ref<'wechat' | 'email' | 'request'>('wechat')

function copyEmail() {
  navigator.clipboard.writeText('shuai.qi@outlook.com')
}
</script>

<template>
  <div class="tool-page feedback-page">
    <div class="feedback-tabs">
      <button
        v-for="t in [
          { key: 'wechat' as const, icon: '💬', label: '公众号反馈' },
          { key: 'email' as const, icon: '📧', label: '邮件反馈' },
          { key: 'request' as const, icon: '💡', label: '期待工具' },
        ]"
        :key="t.key"
        class="fb-tab"
        :class="{ active: tab === t.key }"
        @click="tab = t.key"
      >
        <span class="fb-tab-icon">{{ t.icon }}</span>
        <span class="fb-tab-label">{{ t.label }}</span>
      </button>
    </div>

    <!-- wechat -->
    <div v-if="tab === 'wechat'" class="fb-panel">
      <p class="fb-desc">
        关注「码艺仿」公众号，直接发送反馈信息，我们会及时查看并回复。
      </p>
      <div class="fb-qrcode">
        <img src="/qrcode.jpg" alt="码艺仿公众号二维码" class="qrcode-img" />
      </div>
      <p class="fb-hint">微信扫码关注 · 发送反馈</p>
    </div>

    <!-- email -->
    <div v-if="tab === 'email'" class="fb-panel">
      <p class="fb-desc">
        发送邮件至以下地址，描述你遇到的问题或建议，我们会尽快回复。
      </p>
      <div class="fb-email-card">
        <code class="fb-email">shuai.qi@outlook.com</code>
        <a-button type="primary" size="small" @click="copyEmail">
          复制邮箱
        </a-button>
      </div>
      <p class="fb-hint">邮件标题请注明「在线工具箱反馈」</p>
    </div>

    <!-- request tool -->
    <div v-if="tab === 'request'" class="fb-panel">
      <p class="fb-desc">
        有想要的小工具？通过公众号或邮件告诉我们，我们评估后会尽快安排开发。
      </p>
      <div class="fb-suggest-flow">
        <div class="flow-step">
          <span class="flow-num">1</span>
          <span class="flow-text">关注「码艺仿」公众号 或 发送邮件</span>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">
          <span class="flow-num">2</span>
          <span class="flow-text">描述你需要的工具功能和用途</span>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">
          <span class="flow-num">3</span>
          <span class="flow-text">我们评估并排期开发上线</span>
        </div>
      </div>

      <div class="fb-quick-btns">
        <a-button type="outline" size="small" @click="tab = 'wechat'">前往公众号反馈</a-button>
        <a-button type="outline" size="small" @click="tab = 'email'">前往邮件反馈</a-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feedback-page {
  max-width: 600px;
  margin: 0 auto;
}

.feedback-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  background: var(--color-fill-2);
  border-radius: var(--radius-md);
  padding: 4px;
}

.fb-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 8px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background var(--duration-fast) ease,
    color var(--duration-fast) ease,
    box-shadow var(--duration-fast) ease;
}

.fb-tab:hover {
  color: var(--text-primary);
}

.fb-tab.active {
  background: var(--surface);
  color: var(--brand-600);
  font-weight: 600;
  box-shadow: var(--shadow-sm);
}

.fb-tab-icon {
  font-size: 0.9375rem;
}

.fb-panel {
  text-align: center;
  padding: 8px 0;
}

.fb-desc {
  margin: 0 auto 20px;
  max-width: 32em;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

.fb-qrcode {
  width: 200px;
  height: 200px;
  margin: 0 auto 14px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  background: var(--color-fill-1);
}

.qrcode-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.fb-hint {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--text-tertiary);
}

.fb-email-card {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: var(--brand-gradient-subtle);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  margin-bottom: 14px;
}

.fb-email {
  font-family: ui-monospace, 'Cascadia Code', monospace;
  font-size: 1rem;
  color: var(--brand-600);
  font-weight: 600;
}

.fb-suggest-flow {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: var(--color-fill-1);
  border-radius: var(--radius-sm);
  width: 100%;
  max-width: 300px;
}

.flow-num {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--brand-gradient-subtle);
  color: var(--brand-600);
  font-size: 0.75rem;
  font-weight: 700;
}

.flow-text {
  font-size: 0.875rem;
  color: var(--text-primary);
  text-align: left;
}

.flow-arrow {
  color: var(--text-tertiary);
  font-size: 0.875rem;
}

.fb-quick-btns {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
</style>
