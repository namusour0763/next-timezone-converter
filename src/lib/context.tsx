'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { AppState, Timezone, DateTimeInput, ConversionResult } from '@/types'
import { getCurrentDateTime, convertTimezone } from './timezone-converter'

interface TimezoneContextType {
  state: AppState
  conversionResult: ConversionResult | null
  error: string | null
  updateSourceTimezone: (timezone: Timezone) => void
  updateTargetTimezone: (timezone: Timezone) => void
  updateSourceDateTime: (dateTime: DateTimeInput) => void
}

const TimezoneContext = createContext<TimezoneContextType | undefined>(undefined)

export function useTimezone() {
  const context = useContext(TimezoneContext)
  if (context === undefined) {
    throw new Error('useTimezone must be used within a TimezoneProvider')
  }
  return context
}

interface TimezoneProviderProps {
  children: ReactNode
}

export function TimezoneProvider({ children }: TimezoneProviderProps) {
  const [state, setState] = useState<AppState>({
    sourceTimezone: 'JST',
    targetTimezone: 'UTC',
    sourceDateTime: getCurrentDateTime()
  })
  
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // リアルタイム変換
  useEffect(() => {
    try {
      const result = convertTimezone(
        state.sourceDateTime,
        state.sourceTimezone,
        state.targetTimezone
      )
      setConversionResult(result)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : '変換エラーが発生しました')
      setConversionResult(null)
    }
  }, [state.sourceDateTime, state.sourceTimezone, state.targetTimezone])

  const updateSourceTimezone = (timezone: Timezone) => {
    setState(prev => ({ ...prev, sourceTimezone: timezone }))
  }

  const updateTargetTimezone = (timezone: Timezone) => {
    setState(prev => ({ ...prev, targetTimezone: timezone }))
  }

  const updateSourceDateTime = (dateTime: DateTimeInput) => {
    setState(prev => ({ ...prev, sourceDateTime: dateTime }))
  }

  const value: TimezoneContextType = {
    state,
    conversionResult,
    error,
    updateSourceTimezone,
    updateTargetTimezone,
    updateSourceDateTime
  }

  return (
    <TimezoneContext.Provider value={value}>
      {children}
    </TimezoneContext.Provider>
  )
}