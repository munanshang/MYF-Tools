import type { ToolMeta } from '../types/tool'

export const tools: ToolMeta[] = [
  {
    id: 'json-format',
    title: 'JSON 格式化',
    description: '格式化、压缩与校验 JSON 文本',
    path: '/tools/json-format',
    icon: '{ }',
    category: '编解码',
    component: () => import('../views/tools/JsonFormatView.vue'),
  },
  {
    id: 'base64',
    title: 'Base64 编解码',
    description: '文本与 Base64 互转，支持 UTF-8',
    path: '/tools/base64',
    icon: '64',
    category: '编解码',
    component: () => import('../views/tools/Base64View.vue'),
  },
  {
    id: 'url-codec',
    title: 'URL 编解码',
    description: 'encodeURIComponent / decodeURIComponent 互转',
    path: '/tools/url-codec',
    icon: '%',
    category: '编解码',
    component: () => import('../views/tools/UrlCodecView.vue'),
  },
  {
    id: 'qrcode',
    title: '二维码生成',
    description: '文本/链接生成二维码，支持下载 PNG',
    path: '/tools/qrcode',
    icon: '⊞',
    category: '编解码',
    component: () => import('../views/tools/QrcodeView.vue'),
  },
  {
    id: 'text-diff',
    title: '文本对比',
    description: '左右文本行级对比，统计相同与不同',
    path: '/tools/text-diff',
    icon: '⇄',
    category: '文本处理',
    component: () => import('../views/tools/TextDiffView.vue'),
  },
  {
    id: 'case-convert',
    title: '大小写转换',
    description: '全大写、驼峰、蛇形、短横等常用格式',
    path: '/tools/case-convert',
    icon: 'Aa',
    category: '文本处理',
    component: () => import('../views/tools/CaseConvertView.vue'),
  },
  {
    id: 'regex',
    title: '正则测试',
    description: '正则表达式在线匹配与高亮显示',
    path: '/tools/regex',
    icon: '.*',
    category: '文本处理',
    component: () => import('../views/tools/RegexView.vue'),
  },
  {
    id: 'word-count',
    title: '字数统计',
    description: '统计字符、单词、行数、段落与字节数',
    path: '/tools/word-count',
    icon: '∑',
    category: '文本处理',
    component: () => import('../views/tools/WordCountView.vue'),
  },
  {
    id: 'markdown',
    title: 'Markdown 预览',
    description: 'Markdown 编辑与实时预览，支持 GFM',
    path: '/tools/markdown',
    icon: 'MD',
    category: '文本处理',
    component: () => import('../views/tools/MarkdownView.vue'),
  },
  {
    id: 'timestamp',
    title: '时间戳转换',
    description: 'Unix 时间戳与本地日期时间互转',
    path: '/tools/timestamp',
    icon: '⏱',
    category: '常用转换',
    component: () => import('../views/tools/TimestampView.vue'),
  },
  {
    id: 'radix-convert',
    title: '进制转换',
    description: '二、八、十、十六进制互转',
    path: '/tools/radix-convert',
    icon: '2¹⁶',
    category: '常用转换',
    component: () => import('../views/tools/RadixConvertView.vue'),
  },
  {
    id: 'color',
    title: '颜色转换',
    description: 'HEX / RGB / HSL 颜色格式互转与拾取',
    path: '/tools/color',
    icon: 'RGB',
    category: '常用转换',
    component: () => import('../views/tools/ColorView.vue'),
  },
  {
    id: 'uuid',
    title: 'UUID 生成',
    description: '批量生成 UUID v4，支持一键复制',
    path: '/tools/uuid',
    icon: 'ID',
    category: '常用转换',
    component: () => import('../views/tools/UuidView.vue'),
  },
  {
    id: 'hash',
    title: '哈希计算',
    description: 'MD5、SHA-1、SHA-256 文本摘要',
    path: '/tools/hash',
    icon: '#',
    category: '安全 / 摘要',
    component: () => import('../views/tools/HashView.vue'),
  },
  {
    id: 'ip-lookup',
    title: 'IP 查询',
    description: '查询当前网络公网 IP 与归属地信息',
    path: '/tools/ip-lookup',
    icon: 'IP',
    category: '常用转换',
    component: () => import('../views/tools/IpLookupView.vue'),
  },
  {
    id: 'token',
    title: 'Token 计算',
    description: '估算 LLM 文本 Token 数量与 API 费用',
    path: '/tools/token',
    icon: 'TK',
    category: '常用转换',
    component: () => import('../views/tools/TokenView.vue'),
  },
]

export function getToolByPath(path: string): ToolMeta | undefined {
  return tools.find((t) => t.path === path)
}

export function getCategories(): string[] {
  const seen = new Set<string>()
  return tools.reduce<string[]>((acc, t) => {
    if (!seen.has(t.category)) {
      seen.add(t.category)
      acc.push(t.category)
    }
    return acc
  }, [])
}

export function getToolsByCategory(category: string): ToolMeta[] {
  return tools.filter((t) => t.category === category)
}
