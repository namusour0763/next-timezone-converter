'use client'

import type { DateTimeInput } from '@/types'

interface DateTimeInputProps {
  value: DateTimeInput
  onChange: (dateTime: DateTimeInput) => void
  label: string
}

export function DateTimeInputComponent({ value, onChange, label }: DateTimeInputProps) {
  const handleDateChange = (date: string) => {
    onChange({ ...value, date })
  }

  const handleTimeChange = (time: string) => {
    onChange({ ...value, time })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">{label}</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            日付
          </label>
          <input
            type="date"
            value={value.date}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            時刻
          </label>
          <input
            type="time"
            value={value.time}
            onChange={(e) => handleTimeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  )
}