export type SubmitResult<T = unknown> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: string; fieldErrors?: Record<string, string> }

/**
 * POSTs JSON to an internal API route and normalises the response.
 * Routes return `{ error, fieldErrors? }` on failure.
 */
export async function postJSON<T = unknown>(url: string, body: unknown): Promise<SubmitResult<T>> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await response.json().catch(() => ({}))
    if (response.ok) return { ok: true, data: data as T }
    return {
      ok: false,
      status: response.status,
      error: typeof data.error === 'string' ? data.error : 'Something went wrong. Please try again.',
      fieldErrors: data.fieldErrors,
    }
  } catch {
    return { ok: false, status: 0, error: 'We couldn’t reach the server. Check your connection and try again.' }
  }
}
