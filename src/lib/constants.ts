import type { TimezoneInfo } from '@/types'

export const TIMEZONES: Record<string, TimezoneInfo> = {
  JST: {
    code: 'JST',
    name: '日本標準時',
    offset: 9
  },
  UTC: {
    code: 'UTC',
    name: '協定世界時',
    offset: 0
  },
  PDT: {
    code: 'PDT',
    name: '太平洋夏時間',
    offset: -7
  }
} as const

export const TIMEZONE_OPTIONS = Object.values(TIMEZONES)