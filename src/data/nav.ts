export interface NavItem {
  id: string
  label: string
  icon: string
  path: string
}

export const navItems: NavItem[] = [
  { id: 'home', label: '首页', icon: 'home', path: '/' },
  { id: 'changelog', label: '日志', icon: 'history', path: '/changelog' },
  { id: 'feedback', label: '反馈', icon: 'message', path: '/feedback' },
]
