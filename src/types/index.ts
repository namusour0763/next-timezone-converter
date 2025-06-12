export type Timezone = 'JST' | 'UTC' | 'PDT'

export interface TimezoneInfo {
  code: Timezone
  name: string
  offset: number // UTC からのオフセット（時間）
}

export interface DateTimeInput {
  date: string // YYYY-MM-DD 形式
  time: string // HH:mm 形式
}

export interface ConversionResult {
  sourceTimezone: Timezone
  targetTimezone: Timezone
  sourceDateTime: DateTimeInput
  targetDateTime: DateTimeInput
}

export interface AppState {
  sourceTimezone: Timezone
  targetTimezone: Timezone
  sourceDateTime: DateTimeInput
}