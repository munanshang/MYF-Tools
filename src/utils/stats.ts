export interface StatsData {
  activeVisitors: number
  todayVisitors: number
  todayViews: number
  yesterdayVisitors: number
  yesterdayViews: number
  monthViews: number
  totalViews: number
}

const STATS_ID = '3142448'
const WIDGET_URL = `https://v6-widget.51.la/v6/${STATS_ID}/quote.js`

function parseHtml(html: string): StatsData | null {
  // Extract all numbers from the HTML content
  const matches = html.match(/>(\d[\d,]*)/g)
  if (!matches || matches.length < 7) return null

  const nums = matches.map((m) => {
    const n = m.replace(/[>,]/g, '')
    return parseInt(n, 10)
  })

  return {
    activeVisitors: nums[0] ?? 0,
    todayVisitors: nums[1] ?? 0,
    todayViews: nums[2] ?? 0,
    yesterdayVisitors: nums[3] ?? 0,
    yesterdayViews: nums[4] ?? 0,
    monthViews: nums[5] ?? 0,
    totalViews: nums[6] ?? 0,
  }
}

export function fetchStats(): Promise<StatsData | null> {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    const originalWrite = document.write
    let html = ''

    document.write = (s: string) => {
      html += s
    }

    script.src = WIDGET_URL
    script.async = true

    const cleanup = () => {
      document.write = originalWrite
    }

    script.onload = () => {
      cleanup()
      const stats = parseHtml(html)
      resolve(stats)
    }

    script.onerror = () => {
      cleanup()
      resolve(null)
    }

    document.head.appendChild(script)
  })
}
