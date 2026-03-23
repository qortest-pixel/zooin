/* eslint-disable @typescript-eslint/no-explicit-any */
import statusData from '../../data/status.json';

interface Task {
  name: string;
  status: string;
  date?: string;
  note?: string;
}
interface Project {
  id: string;
  name: string;
  status: string;
  progress: number;
  description: string;
  repo?: string | null;
  url?: string | null;
  tasks: Task[];
}

const projects = statusData.projects as Project[];
const lastUpdated = statusData.lastUpdated;

const statusColors: Record<string, string> = {
  'done': 'bg-green-500',
  'in-progress': 'bg-blue-500',
  'mvp-done': 'bg-blue-500',
  'pending': 'bg-yellow-500',
  'blocked': 'bg-red-500',
  'planned': 'bg-gray-400',
  'todo': 'bg-gray-300',
};

const statusLabels: Record<string, string> = {
  'done': '✅ 완료',
  'in-progress': '🔄 진행중',
  'mvp-done': '🔄 MVP 완료',
  'pending': '⏳ 대기',
  'blocked': '🚫 차단',
  'planned': '📋 기획됨',
  'todo': '⬜ 대기',
};

const taskIcons: Record<string, string> = {
  'done': '✅',
  'pending': '⏳',
  'blocked': '🚫',
  'todo': '⬜',
};

export default function StatusPage() {
  const updated = new Date(lastUpdated);
  const totalProgress = Math.round(
    projects.reduce((sum, p) => sum + p.progress, 0) / projects.length
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-2">📊 프로젝트 대시보드</h1>
          <p className="text-indigo-200">실시간 진행 현황 — 마지막 업데이트: {updated.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
          
          {/* Overall progress */}
          <div className="mt-6 bg-white/10 rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>전체 진행률</span>
              <span className="font-bold">{totalProgress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Project header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{project.name}</h2>
                  <p className="text-gray-500 mt-1">{project.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${statusColors[project.status] || 'bg-gray-400'}`}>
                  {statusLabels[project.status] || project.status}
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>진행률</span>
                  <span className="font-medium text-gray-700">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className={`rounded-full h-2.5 transition-all ${
                      project.progress >= 80 ? 'bg-green-500' :
                      project.progress >= 40 ? 'bg-blue-500' :
                      project.progress > 0 ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Links */}
              {(project.repo || project.url) && (
                <div className="mt-3 flex gap-3 text-sm">
                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noopener" className="text-indigo-600 hover:underline">
                      GitHub →
                    </a>
                  )}
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener" className="text-indigo-600 hover:underline">
                      사이트 →
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Tasks */}
            <div className="p-6">
              <div className="grid gap-2">
                {project.tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-lg">{taskIcons[task.status] || '⬜'}</span>
                    <span className={task.status === 'done' ? 'text-gray-500 line-through' : 'text-gray-700'}>
                      {task.name}
                    </span>
                    {task.date && (
                      <span className="text-xs text-gray-400 ml-auto">{task.date}</span>
                    )}
                    {task.note && (
                      <span className="text-xs text-orange-500 ml-auto">{task.note}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
            <div className="text-2xl font-bold text-indigo-600">{projects.length}</div>
            <div className="text-sm text-gray-500">프로젝트</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
            <div className="text-2xl font-bold text-green-600">
              {projects.filter(p => p.status === 'done' || p.status === 'mvp-done').length}
            </div>
            <div className="text-sm text-gray-500">MVP 완료</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
            <div className="text-2xl font-bold text-blue-600">
              {projects.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'done').length, 0)}
            </div>
            <div className="text-sm text-gray-500">완료 태스크</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
            <div className="text-2xl font-bold text-gray-600">
              {projects.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'todo').length, 0)}
            </div>
            <div className="text-sm text-gray-500">남은 태스크</div>
          </div>
        </div>
      </div>
    </main>
  );
}
