import { THEMES, type Theme } from './types.ts'

export const THEME_LABELS: Record<Theme, string> = {
  faith: 'Faith',
  discipline: 'Discipline',
  identity: 'Identity',
  purpose: 'Purpose',
  failure: 'Failure',
  recovery: 'Recovery',
  leadership: 'Leadership',
}

export function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && (THEMES as readonly string[]).includes(value)
}
