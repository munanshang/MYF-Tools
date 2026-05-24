export interface NavItem {
  id: string
  label: string
  icon: string
  path: string
  desc?: string
}

export const navItems: NavItem[] = [
  { id: 'home', label: '首页', icon: 'home', path: '/' },
  { id: 'changelog', label: '日志', icon: 'history', path: '/changelog', desc: '网站维护与工具变更记录' },
  { id: 'feedback', label: '反馈', icon: 'message', path: '/feedback', desc: '公众号 / 邮件反馈，期待工具' },
  { id: 'about', label: '关于', icon: 'info-circle', path: '/about', desc: '关于码艺坊与作者信息' },
]
