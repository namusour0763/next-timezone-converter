'use client'

import type { ConversionResult, Timezone } from '@/types'
import { TIMEZONES } from '@/lib/constants'

interface ConversionResultProps {
  result: ConversionResult | null
  error: string | null
  targetTimezone: Timezone
}

export function ConversionResultComponent({ result, error, targetTimezone }: ConversionResultProps) {
  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">変換結果</h3>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">変換結果</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <p className="text-gray-500 text-sm">変換結果を計算中...</p>
        </div>
      </div>
    )
  }

  const targetTimezoneInfo = TIMEZONES[targetTimezone]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">変換結果</h3>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              タイムゾーン
            </label>
            <div className="text-sm text-gray-900">
              {targetTimezoneInfo.code} - {targetTimezoneInfo.name}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              日付
            </label>
            <div className="text-lg font-mono text-gray-900">
              {result.targetDateTime.date}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              時刻
            </label>
            <div className="text-lg font-mono text-gray-900">
              {result.targetDateTime.time}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}