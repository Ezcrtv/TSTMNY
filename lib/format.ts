const long = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`)
  return Number.isNaN(date.getTime()) ? '' : long.format(date)
}

export function formatYear(iso: string): string {
  return iso.slice(0, 4)
}
