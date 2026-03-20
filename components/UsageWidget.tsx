'use client'
import { useEffect, useState } from 'react'

interface Agent {
  id: string; label: string; model: string; provider: string
  status: 'active' | 'used' | 'standby'; usedToday: boolean
  calls: number; note: string
}
interface UsageData {
  updatedAtKST: string; date: string
  primaryModel: string; contextPercent: number
  contextUsed: number; contextLimit: number
  cacheHitRate: number; compactions: number; webSearches: number
  status: string; agents: Agent[]
  summary: { totalModels: number; activeToday: number; standby: number }
}

const PROVIDER_COLOR: Record<string, string> = {
  Anthropic: 'text-orange-600 bg-orange-50',
  Copilot:   'text-blue-600 bg-blue-50',
  CodeX:     'text-green-600 bg-green-50',
  Kimi:      'text-purple-600 bg-purple-50',
}
const STATUS_DOT: Record<string, string> = {
  active:  'bg-emerald-400 animate-pulse',
  used:    'bg-blue-400',
  standby: 'bg-gray-300',
}
const STATUS_LABEL: Record<string, string> = {
  active:  '실행 중',
  used:    '오늘 사용',
  standby: '대기',
}
const AGENT_EMOJI: Record<string, string> = {
  main: '🧠', analyst: '🔍', strategist: '♟️',
  executor: '⚡', researcher: '🔬', casual: '💬',
}

export default function UsageWidget() {
  const [data, setData] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastFetch, setLastFetch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      const res = await fetch('/api/usage', { cache: 'no-store' })
      if (res.ok) { setData(await res.json()); setLastFetch(new Date().toLocaleTimeString('ko-KR')) }
    } catch {}
    setLoading(false)
  }

  useEffect(() => { fetchData(); const iv = setInterval(fetchData, 30000); return () => clearInterval(iv) }, [])

  if (loading) return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse">
      <div className="h-4 bg-gray-100 rounded w-32 mb-3" /><div className="h-2 bg-gray-100 rounded w-full" />
    </div>
  )
  if (!data) return null

  const ctx = data.contextPercent ?? 0
  const ctxColor = ctx > 80 ? 'bg-red-400' : ctx > 60 ? 'bg-amber-400' : 'bg-violet-500'

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      {/* 헤더 */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">AI 사용 현황</span>
          </div>
          <span className="text-[11px] text-gray-400">{lastFetch} 갱신</span>
        </div>

        {/* 컨텍스트 */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>컨텍스트 사용량</span>
            <span className="font-semibold text-gray-800">{ctx}% <span className="text-gray-400 font-normal">({data.contextUsed}k / {data.contextLimit}k)</span></span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-700 ${ctxColor}`} style={{ width: `${ctx}%` }} />
          </div>
        </div>

        {/* 스탯 3칸 */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: '캐시 히트', value: `${data.cacheHitRate}%`, color: 'text-emerald-600' },
            { label: '웹 검색', value: `${data.webSearches}회`, color: 'text-blue-600' },
            { label: '압축', value: `${data.compactions}회`, color: 'text-violet-600' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-xl px-3 py-2.5 text-center">
              <div className="text-[10px] text-gray-400 mb-0.5">{s.label}</div>
              <div className={`text-sm font-bold ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 에이전트 목록 */}
      <div className="border-t border-gray-50 px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">에이전트 팀</span>
          <div className="flex items-center gap-3 text-[10px] text-gray-400">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />실행 중 {data.summary.activeToday}</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />대기 {data.summary.standby}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          {data.agents?.map(a => (
            <div key={a.id}>
              <button
                onClick={() => setExpanded(expanded === a.id ? null : a.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                  a.status === 'active' ? 'bg-violet-50 border border-violet-100 hover:bg-violet-100' :
                  a.status === 'used'   ? 'bg-blue-50 border border-blue-100 hover:bg-blue-100' :
                  'bg-gray-50 hover:bg-gray-100 border border-transparent'
                }`}
              >
                <span className="text-base w-6 text-center">{AGENT_EMOJI[a.id] ?? '🤖'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-800">{a.label}</span>
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${PROVIDER_COLOR[a.provider] ?? 'text-gray-500 bg-gray-100'}`}>{a.provider}</span>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5 truncate">{a.model}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {a.usedToday && <span className="text-[10px] font-semibold text-gray-600">{a.calls > 0 ? `${a.calls}회` : ''}</span>}
                  <div className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[a.status]}`} />
                    <span className="text-[10px] text-gray-500">{STATUS_LABEL[a.status]}</span>
                  </div>
                  <span className="text-[10px] text-gray-300">{expanded === a.id ? '▲' : '▼'}</span>
                </div>
              </button>

              {/* 펼치기 */}
              {expanded === a.id && (
                <div className="mx-1 px-4 py-2.5 bg-gray-50 rounded-b-xl border-x border-b border-gray-100 -mt-1">
                  <div className="text-[11px] text-gray-600">{a.note}</div>
                  {!a.usedToday && (
                    <div className="mt-1 text-[10px] text-gray-400">
                      💡 <span className="font-medium">"분석해줘" / "전략 짜줘" / "만들어줘"</span> 등 키워드로 자동 활성화
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pb-4 text-[10px] text-gray-400 text-right">
        데이터 기준: {data.updatedAtKST}
      </div>
    </div>
  )
}
