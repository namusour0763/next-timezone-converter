'use client'

import { TimezoneProvider, useTimezone } from '@/lib/context'
import { TimezoneSelect } from '@/components/TimezoneSelect'
import { DateTimeInputComponent } from '@/components/DateTimeInput'
import { ConversionResultComponent } from '@/components/ConversionResult'

function TimezoneConverterContent() {
  const {
    state,
    conversionResult,
    error,
    updateSourceTimezone,
    updateTargetTimezone,
    updateSourceDateTime
  } = useTimezone()

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">タイムゾーン変換</h1>
          <p className="text-gray-600 mt-1">JST、UTC、PDT間での時刻変換</p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="flex-1 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
          {/* 変換元 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              <TimezoneSelect
                value={state.sourceTimezone}
                onChange={updateSourceTimezone}
                label="変換元タイムゾーン"
              />
              
              <DateTimeInputComponent
                value={state.sourceDateTime}
                onChange={updateSourceDateTime}
                label="変換元の日時"
              />
            </div>
          </div>

          {/* 変換先 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              <TimezoneSelect
                value={state.targetTimezone}
                onChange={updateTargetTimezone}
                label="変換先タイムゾーン"
              />
              
              <ConversionResultComponent
                result={conversionResult}
                error={error}
                targetTimezone={state.targetTimezone}
              />
            </div>
          </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <TimezoneProvider>
      <TimezoneConverterContent />
    </TimezoneProvider>
  )
}