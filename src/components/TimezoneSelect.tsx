'use client'

import type { Timezone } from '@/types'
import { TIMEZONE_OPTIONS } from '@/lib/constants'

interface TimezoneSelectProps {
  value: Timezone
  onChange: (timezone: Timezone) => void
  label: string
}

export function TimezoneSelect({ value, onChange, label }: TimezoneSelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Timezone)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {TIMEZONE_OPTIONS.map((timezone) => (
          <option key={timezone.code} value={timezone.code}>
            {timezone.code} - {timezone.name}
          </option>
        ))}
      </select>
    </div>
  )
}