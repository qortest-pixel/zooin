'use client'
import { useEffect, useState } from 'react'

interface UsageData {
  updatedAtKST: string
  model: string
  contextUsed: number
  contextLimit: number
  contextPercent: number
  cacheHitRate: number
  compactions: number
  status: string
  agents: { id: string; model: string; status: string }[]
}

const MODEL_SHORT: Record<string, string> = {
  'claude-sonnet-4-6': 'Sonnet',
  'claude-opus-4-6': 'Opus',
  'gpt-5.4': 'GPT-5',
  'kimi-k2': 'Kimi',
  'gemini-flash': 'Gemini',
}

const AGENT_EMOJI: Record<string, string> = {
  main: '🧠', analyst: '🔍', strategist: '♟️',
  executor: '⚡', researcher: '🔬', casual: '💬',
}

export default function UsageWidget() {
  const [data, setData] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastFetch, setLastFetch] = useState('')

  const fetchData = async () => {
    try {
      const res = await fetch('/api/usage', { cache: 'no-store' })
      if (res.ok) {
        const d = await res.json()
        setData(d)
        setLastFetch(new Date().toLocaleTimeString('ko-KR'))
      }
    } catch {}
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    const iv = setInterval(fetchData, 30000) // 30초마다 갱신
    return () => clearInterval(iv)
  }, [])

  if (loading) return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse">
      <div className="h-4 bg-gray-100 rounded w-32 mb-3" />
      <div className="h-2 bg-gray-100 rounded w-full" />
    </div>
  )

  if (!data) return null

  const ctx = data.contextPercent ?? 0
  const ctxColor = ctx > 80 ? 'bg-red-400' : ctx > 60 ? 'bg-amber-400' : 'bg-violet-500'

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">AI 상태</span>
        </div>
        <span className="text-[11px] text-gray-400">{lastFetch} 갱신</span>
      </div>

      {/* 컨텍스트 사용량 */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>컨텍스트</span>
          <span className="font-medium text-gray-700">{ctx}% <span className="text-gray-400">({data.contextUsed}k / {data.contextLimit}k)</span></span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${ctxColor}`}
            style={{ width: `${ctx}%` }}
          />
        </div>
      </div>

      {/* 모델 & 캐시 */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2 text-center">
          <div className="text-[10px] text-gray-400 mb-0.5">모델</div>
          <div className="text-xs font-semibold text-violet-600">{MODEL_SHORT[data.model] ?? data.model}</div>
        </div>
        <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2 text-center">
          <div className="text-[10px] text-gray-400 mb-0.5">캐시 히트</div>
          <div className="text-xs font-semibold text-emerald-600">{data.cacheHitRate}%</div>
        </div>
        <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2 text-center">
          <div className="text-[10px] text-gray-400 mb-0.5">압축</div>
          <div className="text-xs font-semibold text-gray-700">{data.compactions}회</div>
        </div>
      </div>

      {/* 에이전트 목록 */}
      <div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-2">에이전트 팀</div>
        <div className="grid grid-cols-3 gap-1.5">
          {data.agents?.map(a => (
            <div key={a.id} className={`rounded-lg px-2 py-1.5 text-center ${a.status === 'active' ? 'bg-violet-50 border border-violet-100' : 'bg-gray-50'}`}>
              <div className="text-base leading-none mb-0.5">{AGENT_EMOJI[a.id] ?? '🤖'}</div>
              <div className="text-[9px] font-medium text-gray-600 capitalize">{a.id}</div>
              <div className="text-[9px] text-gray-400">{MODEL_SHORT[a.model] ?? a.model}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 업데이트 시간 */}
      <div className="mt-3 pt-3 border-t border-gray-50 text-[10px] text-gray-400 text-right">
        데이터 기준: {data.updatedAtKST}
      </div>
    </div>
  )
}
