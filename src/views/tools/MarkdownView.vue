<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'

marked.setOptions({ breaks: true, gfm: true })

const md = ref('')
const previewMode = ref(false)

const html = computed(() => {
  if (!md.value.trim()) return ''
  return marked.parse(md.value) as string
})

function copyHtml() {
  navigator.clipboard.writeText(html.value)
}
</script>

<template>
  <div class="tool-page">
    <a-space direction="vertical" :size="14" fill>
      <div class="md-toolbar">
        <a-radio-group v-model="previewMode" type="button">
          <a-radio :value="false">编辑</a-radio>
          <a-radio :value="true">预览</a-radio>
        </a-radio-group>
        <a-button type="text" size="small" @click="copyHtml">复制 HTML</a-button>
      </div>

      <a-textarea
        v-if="!previewMode"
        v-model="md"
        class="tool-field md-editor"
        placeholder="输入 Markdown 文本……"
        :auto-size="{ minRows: 10, maxRows: 24 }"
        allow-clear
      />

      <div v-else class="md-preview" v-html="html" />
    </a-space>
  </div>
</template>

<style scoped>
.md-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.md-editor {
  font-family: ui-monospace, 'Cascadia Code', monospace;
  font-size: 0.875rem;
  line-height: 1.7;
}

.md-preview {
  padding: 16px 18px;
  background: var(--color-fill-1);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  min-height: 200px;
  font-size: 0.9375rem;
  line-height: 1.75;
  color: var(--text-primary);
}

.md-preview :deep(h1),
.md-preview :deep(h2),
.md-preview :deep(h3) {
  margin-top: 1.2em;
  margin-bottom: 0.5em;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.md-preview :deep(h1) { font-size: 1.5rem; }
.md-preview :deep(h2) { font-size: 1.25rem; }
.md-preview :deep(h3) { font-size: 1.1rem; }

.md-preview :deep(p) {
  margin: 0.4em 0;
}

.md-preview :deep(code) {
  padding: 2px 6px;
  background: var(--brand-gradient-subtle);
  border-radius: 4px;
  font-size: 0.875rem;
  color: var(--brand-600);
}

.md-preview :deep(pre) {
  padding: 14px 16px;
  background: #0f172a;
  border-radius: var(--radius-sm);
  overflow-x: auto;
}

.md-preview :deep(pre code) {
  background: none;
  color: #e2e8f0;
  padding: 0;
}

.md-preview :deep(blockquote) {
  margin: 0.6em 0;
  padding: 4px 14px;
  border-left: 3px solid var(--brand-500);
  color: var(--text-secondary);
}

.md-preview :deep(table) {
  width: 100%;
  border-collapse: collapse;
}

.md-preview :deep(th),
.md-preview :deep(td) {
  padding: 8px 12px;
  border: 1px solid var(--border-subtle);
  text-align: left;
}

.md-preview :deep(th) {
  background: var(--color-fill-2);
  font-weight: 600;
}
</style>
