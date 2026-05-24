import type { Component } from 'vue'

export interface ToolMeta {
  id: string
  title: string
  description: string
  path: string
  icon: string
  category: string
  component: () => Promise<{ default: Component }>
}
