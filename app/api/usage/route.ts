import { NextResponse } from 'next/server'

export const revalidate = 0

export async function GET() {
  try {
    const res = await fetch(
      'https://raw.githubusercontent.com/qortest-pixel/zooin/main/data/usage-stats.json',
      { cache: 'no-store' }
    )
    if (!res.ok) throw new Error('fetch failed')
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 })
  }
}
