import type { Timezone, DateTimeInput, ConversionResult } from '@/types'
import { TIMEZONES } from './constants'

export function getCurrentDateTime(): DateTimeInput {
  const now = new Date()
  const date = now.toISOString().split('T')[0] // YYYY-MM-DD
  const time = now.toTimeString().split(' ')[0].slice(0, 5) // HH:mm
  
  return { date, time }
}

export function parseDateTime(dateTime: DateTimeInput, timezone: Timezone): Date {
  const { date, time } = dateTime
  const dateTimeString = `${date}T${time}:00`
  const localDate = new Date(dateTimeString)
  
  // タイムゾーンオフセットを考慮してUTCに変換
  const timezoneOffset = TIMEZONES[timezone].offset
  const utcDate = new Date(localDate.getTime() - (timezoneOffset * 60 * 60 * 1000))
  
  return utcDate
}

export function formatDateTime(date: Date, timezone: Timezone): DateTimeInput {
  // UTCからターゲットタイムゾーンに変換
  const timezoneOffset = TIMEZONES[timezone].offset
  const targetDate = new Date(date.getTime() + (timezoneOffset * 60 * 60 * 1000))
  
  const dateStr = targetDate.toISOString().split('T')[0] // YYYY-MM-DD
  const timeStr = targetDate.toISOString().split('T')[1].slice(0, 5) // HH:mm
  
  return {
    date: dateStr,
    time: timeStr
  }
}

export function convertTimezone(
  sourceDateTime: DateTimeInput,
  sourceTimezone: Timezone,
  targetTimezone: Timezone
): ConversionResult {
  try {
    // ソースタイムゾーンの日時をUTCに変換
    const utcDate = parseDateTime(sourceDateTime, sourceTimezone)
    
    // UTCからターゲットタイムゾーンに変換
    const targetDateTime = formatDateTime(utcDate, targetTimezone)
    
    return {
      sourceTimezone,
      targetTimezone,
      sourceDateTime,
      targetDateTime
    }
  } catch (error) {
    console.error('Timezone conversion error:', error)
    throw new Error('時刻変換でエラーが発生しました')
  }
}

export function validateDateTime(dateTime: DateTimeInput): boolean {
  const { date, time } = dateTime
  
  // 日付形式チェック (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(date)) {
    return false
  }
  
  // 時刻形式チェック (HH:mm)
  const timeRegex = /^\d{2}:\d{2}$/
  if (!timeRegex.test(time)) {
    return false
  }
  
  // 実際の日時として有効かチェック
  const dateTimeString = `${date}T${time}:00`
  const testDate = new Date(dateTimeString)
  
  return !isNaN(testDate.getTime())
}