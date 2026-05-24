export interface ChangelogEntry {
  date: string
  version: string
  title: string
  tag: 'new' | 'improve' | 'fix' | 'remove'
  details: string[]
}

export const changelog: ChangelogEntry[] = [
  {
    date: '2026-05-25',
    version: 'v1.3.0',
    title: '新增正则测试、字数统计、Markdown 预览、IP 查询与 Token 计算',
    tag: 'new',
    details: [
      '新增「正则测试」工具：正则表达式在线测试，匹配结果高亮显示',
      '新增「字数统计」工具：实时统计字符数、单词数、行数、段落数、字节数',
      '新增「Markdown 预览」工具：Markdown 编辑与实时预览，支持复制 HTML',
      '新增「IP 查询」工具：一键查询当前公网 IP 与归属地信息',
      '新增「Token 计算」工具：估算 LLM Token 数量与 API 费用，支持多模型对比',
      '网站标题更新为「码艺坊在线工具箱」，导航栏增加 logo 图标',
      '优化加载动画：分段进度条、流光效果、状态提示文案',
      '优化公告弹窗：标题与按钮固定、自适应布局、会话内只弹一次',
      '新增更新日志页面，导航菜单增加日志与反馈入口',
    ],
  },
  {
    date: '2026-05-25',
    version: 'v1.2.0',
    title: '新增颜色转换与二维码生成工具',
    tag: 'new',
    details: [
      '新增「颜色转换」工具：支持 HEX / RGB / HSL 三种格式互转与拖拽调色',
      '新增「二维码生成」工具：文本/链接生成二维码，支持下载 PNG',
      '首页新增分类目录侧边栏，点击快速跳转到对应分类',
      '侧边栏展示码艺坊公众号二维码，方便关注',
      '新增反馈与建议页面，支持公众号反馈、邮件反馈、期待工具提交',
    ],
  },
  {
    date: '2026-05-24',
    version: 'v1.1.0',
    title: '工具分类与页面体验优化',
    tag: 'improve',
    details: [
      '工具按分类分组展示：编解码、文本处理、常用转换、安全/摘要',
      '新增网站加载动画页面',
      '优化页面布局与视觉细节',
      '移动端适配优化',
    ],
  },
  {
    date: '2026-05-23',
    version: 'v1.0.0',
    title: '在线工具箱正式上线',
    tag: 'new',
    details: [
      '首批上线 9 款常用开发工具：JSON 格式化、Base64 编解码、时间戳转换、URL 编解码、UUID 生成、哈希计算、文本对比、大小写转换、进制转换',
      '响应式布局，电脑与手机均可访问',
      '基于 Vue 3 + Arco Design 构建',
    ],
  },
]

export const tagLabel: Record<ChangelogEntry['tag'], string> = {
  new: '新增',
  improve: '优化',
  fix: '修复',
  remove: '下架',
}

export const tagColor: Record<ChangelogEntry['tag'], string> = {
  new: '#22c55e',
  improve: '#3b82f6',
  fix: '#f59e0b',
  remove: '#ef4444',
}
