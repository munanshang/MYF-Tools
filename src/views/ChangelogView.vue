<script setup lang="ts">
import { changelog, tagLabel, tagColor } from '../data/changelog'
</script>

<template>
  <div class="tool-page changelog-page">
    <div class="cl-header">
      <h1 class="cl-title">更新日志</h1>
      <p class="cl-sub">网站的维护记录、工具发布与变更</p>
    </div>

    <div class="timeline">
      <div
        v-for="(entry, idx) in changelog"
        :key="idx"
        class="tl-item"
      >
        <div class="tl-dot" :style="{ background: tagColor[entry.tag] }" />
        <div class="tl-card">
          <div class="tl-card-head">
            <div class="tl-meta">
              <span class="tl-date">{{ entry.date }}</span>
              <span class="tl-version">{{ entry.version }}</span>
              <span
                class="tl-tag"
                :style="{ background: tagColor[entry.tag] }"
              >
                {{ tagLabel[entry.tag] }}
              </span>
            </div>
            <h3 class="tl-card-title">{{ entry.title }}</h3>
          </div>
          <ul class="tl-details">
            <li v-for="(d, di) in entry.details" :key="di">{{ d }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="cl-footer">
      <p>码艺坊 · 持续更新中</p>
    </div>
  </div>
</template>

<style scoped>
.changelog-page {
  max-width: 640px;
  margin: 0 auto;
}

.cl-header {
  text-align: center;
  margin-bottom: 28px;
}

.cl-title {
  margin: 0 0 6px;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.cl-sub {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-tertiary);
}

.timeline {
  position: relative;
  padding-left: 28px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 4px;
  bottom: 0;
  width: 2px;
  background: var(--border-default);
  border-radius: 1px;
}

.tl-item {
  position: relative;
  margin-bottom: 24px;
}

.tl-dot {
  position: absolute;
  left: -23px;
  top: 8px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px var(--page-bg);
}

.tl-card {
  background: var(--color-fill-1);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  padding: 14px 16px;
}

.tl-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.tl-date {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  font-family: ui-monospace, monospace;
}

.tl-version {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 2px 6px;
  background: var(--color-fill-2);
  border-radius: 4px;
}

.tl-tag {
  font-size: 0.6875rem;
  font-weight: 600;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
}

.tl-card-title {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
}

.tl-details {
  margin: 10px 0 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tl-details li {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.cl-footer {
  text-align: center;
  padding: 8px 0;
}

.cl-footer p {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--text-tertiary);
}
</style>
