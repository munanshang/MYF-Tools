<script setup lang="ts">
import { computed, ref } from 'vue'

const leftText = ref('')
const rightText = ref('')

interface DiffLine {
  lineNo: number
  left: string
  right: string
  status: 'same' | 'diff' | 'left-only' | 'right-only'
}

const diffLines = computed<DiffLine[]>(() => {
  const left = leftText.value.split('\n')
  const right = rightText.value.split('\n')
  const max = Math.max(left.length, right.length)
  const rows: DiffLine[] = []

  for (let i = 0; i < max; i++) {
    const l = left[i] ?? ''
    const r = right[i] ?? ''
    let status: DiffLine['status'] = 'same'
    if (i >= left.length) status = 'right-only'
    else if (i >= right.length) status = 'left-only'
    else if (l !== r) status = 'diff'

    rows.push({ lineNo: i + 1, left: l, right: r, status })
  }
  return rows
})

const stats = computed(() => {
  let same = 0
  let diff = 0
  for (const row of diffLines.value) {
    if (row.status === 'same') same++
    else diff++
  }
  return { same, diff, total: diffLines.value.length }
})

function clearAll() {
  leftText.value = ''
  rightText.value = ''
}
</script>

<template>
  <div class="tool-page">
    <a-space direction="vertical" :size="12" fill>
      <a-row :gutter="12">
        <a-col :xs="24" :md="12">
          <div class="tool-label">文本 A</div>
          <a-textarea
            v-model="leftText"
            placeholder="粘贴左侧文本…"
            allow-clear
            :auto-size="{ minRows: 8 }"
          />
        </a-col>
        <a-col :xs="24" :md="12">
          <div class="tool-label">文本 B</div>
          <a-textarea
            v-model="rightText"
            placeholder="粘贴右侧文本…"
            allow-clear
            :auto-size="{ minRows: 8 }"
          />
        </a-col>
      </a-row>

      <div class="tool-actions">
        <a-button type="text" @click="clearAll">清空</a-button>
      </div>

      <a-alert v-if="diffLines.length" type="info">
        共 {{ stats.total }} 行 · 相同 {{ stats.same }} 行 · 不同 {{ stats.diff }} 行
      </a-alert>

      <div v-if="diffLines.length" class="diff-table-wrap">
        <table class="diff-table">
          <thead>
            <tr>
              <th class="col-no">#</th>
              <th>文本 A</th>
              <th>文本 B</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in diffLines"
              :key="row.lineNo"
              :class="`row-${row.status}`"
            >
              <td class="col-no">{{ row.lineNo }}</td>
              <td>
                <span v-if="row.status === 'right-only'" class="empty">—</span>
                <span v-else>{{ row.left || ' ' }}</span>
              </td>
              <td>
                <span v-if="row.status === 'left-only'" class="empty">—</span>
                <span v-else>{{ row.right || ' ' }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </a-space>
  </div>
</template>

<style scoped>
.diff-table-wrap {
  overflow-x: auto;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
}

.diff-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
  font-family: ui-monospace, 'Cascadia Code', monospace;
}

.diff-table th,
.diff-table td {
  padding: 6px 10px;
  border-bottom: 1px solid var(--border-subtle);
  text-align: left;
  vertical-align: top;
}

.diff-table th {
  background: #f1f5f9;
  font-weight: 600;
  color: var(--text-secondary);
}

.col-no {
  width: 40px;
  color: var(--text-tertiary);
  text-align: center !important;
}

.row-same td {
  background: #fff;
}

.row-diff td {
  background: #fef3c7;
}

.row-left-only td:first-of-type,
.row-left-only td:nth-child(2) {
  background: #fee2e2;
}

.row-right-only td:nth-child(3) {
  background: #dbeafe;
}

.empty {
  color: var(--text-tertiary);
}
</style>
