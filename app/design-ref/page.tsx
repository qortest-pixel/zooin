"use client";

const brands = [
  {
    name: "Seed Daily Synbiotic",
    country: "🇺🇸 미국",
    category: "프리미엄 유산균",
    price: "$49.99/월",
    colors: ["#2D5016", "#FFFFFF", "#E8F0E0"],
    colorNames: "딥 그린 + 화이트",
    style: "미니멀 + 친환경",
    gradient: "from-green-800 to-emerald-900",
    accentBg: "bg-green-50",
    accentText: "text-green-800",
    accentBorder: "border-green-200",
    link: "https://seed.com",
    img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    features: [
      "리필 가능한 유리병 + 생분해 파우치",
      "과학 논문 인용 기반 라벨링",
      "SNS에서 '패키지 때문에 샀다'는 반응",
      "패키지 자체가 인테리어 소품 역할",
    ],
    lesson: "친환경 소재 + 미니멀 디자인 = 프리미엄 신뢰감의 정석. '장펴내'도 리필 구조 고려 가능.",
    designScore: 98,
  },
  {
    name: "AG1 (Athletic Greens)",
    country: "🇺🇸 미국",
    category: "프리미엄 건강식품",
    price: "$99/월",
    colors: ["#1A1A1A", "#C5A55A", "#FFFFFF"],
    colorNames: "블랙 + 골드 + 화이트",
    style: "럭셔리 미니멀",
    gradient: "from-gray-900 to-black",
    accentBg: "bg-gray-50",
    accentText: "text-gray-800",
    accentBorder: "border-gray-200",
    link: "https://drinkag1.com",
    img: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=400&fit=crop",
    features: [
      "매트 블랙 파우치 + 골드 레터링",
      "프리미엄 틴 캔 용기",
      "구독 모델 전용 패키지",
      "인플루언서 마케팅의 교과서",
    ],
    lesson: "블랙+골드 조합 = 고가 건강식품의 대표 공식. 코르티솔 관리라는 '장펴내' 콘셉트와 궁합 최고.",
    designScore: 95,
  },
  {
    name: "종근당 락토핏 골드",
    country: "🇰🇷 한국",
    category: "유산균 (국내 1위)",
    price: "₩35,000~45,000",
    colors: ["#FFFFFF", "#C9A84C", "#2C2C2C"],
    colorNames: "화이트 + 골드 + 블랙",
    style: "클래식 프리미엄",
    gradient: "from-amber-600 to-yellow-700",
    accentBg: "bg-amber-50",
    accentText: "text-amber-800",
    accentBorder: "border-amber-200",
    link: "https://www.ckdhc.com/brand/lactofit",
    img: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop",
    features: [
      "화이트 베이스에 골드 포인트 — 신뢰감",
      "개별 스틱팩 구성",
      "깔끔한 산세리프 타이포",
      "유산균 시장 점유율 1위",
    ],
    lesson: "한국 소비자가 '고급 유산균'하면 떠올리는 이미지의 기준. 화이트+골드는 안전한 선택.",
    designScore: 82,
  },
  {
    name: "뉴트리원 프로바이오틱스",
    country: "🇰🇷 한국",
    category: "프리미엄 유산균",
    price: "₩40,000~60,000",
    colors: ["#1A1A2E", "#C9A84C", "#FFFFFF"],
    colorNames: "네이비/블랙 + 골드",
    style: "럭셔리 제약",
    gradient: "from-indigo-900 to-slate-900",
    accentBg: "bg-indigo-50",
    accentText: "text-indigo-800",
    accentBorder: "border-indigo-200",
    link: "https://www.nutrione.co.kr",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    features: [
      "다크 네이비/블랙 베이스 — 고급감 극대화",
      "골드 박(箔) 처리 로고",
      "무광(매트) 마감",
      "엠보싱 포인트",
    ],
    lesson: "네이비+골드+매트 = '장펴내 세르티솔'에 가장 적합한 레퍼런스. 코르티솔(스트레스 관리) 이미지와 딱.",
    designScore: 90,
  },
  {
    name: "대웅제약 락피더스",
    country: "🇰🇷 한국",
    category: "제약사 유산균",
    price: "₩30,000~45,000",
    colors: ["#1E40AF", "#FFFFFF", "#E5E7EB"],
    colorNames: "블루 + 화이트",
    style: "메디컬 클린",
    gradient: "from-blue-700 to-blue-900",
    accentBg: "bg-blue-50",
    accentText: "text-blue-800",
    accentBorder: "border-blue-200",
    link: "https://www.daewoong.co.kr",
    img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop",
    features: [
      "블루+화이트 = 의약품 느낌의 신뢰감",
      "제약회사 특유의 클린한 레이아웃",
      "성분·인증 정보 강조",
      "심플하고 정돈된 그리드",
    ],
    lesson: "제약회사 스타일은 '신뢰'에 강하지만 '감성'이 약함. 장펴내는 신뢰+감성 둘 다 잡아야.",
    designScore: 75,
  },
  {
    name: "Ritual Synbiotic+",
    country: "🇺🇸 미국",
    category: "프리미엄 건강 보충제",
    price: "$54/월",
    colors: ["#F5F0E8", "#2E7D5B", "#1A1A1A"],
    colorNames: "민트그린 + 크림화이트 + 블랙",
    style: "투명 미니멀",
    gradient: "from-teal-600 to-emerald-700",
    accentBg: "bg-teal-50",
    accentText: "text-teal-800",
    accentBorder: "border-teal-200",
    link: "https://ritual.com",
    img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop",
    features: [
      "투명 유리병 — 캡슐이 보이는 디자인",
      "'보이는 것이 전부' 라는 투명성 철학",
      "깔끔한 산세리프 + 민트 컬러",
      "성분 하나하나 추적 가능 (QR 연동)",
    ],
    lesson: "투명성 = 신뢰. 장펴내도 '코르티솔 관리' 성분 투명 공개 + QR코드 연동 고려.",
    designScore: 92,
  },
  {
    name: "Olly Probiotics",
    country: "🇺🇸 미국",
    category: "MZ세대 건강식품",
    price: "$15~25",
    colors: ["#FF6B6B", "#FFE66D", "#4ECDC4"],
    colorNames: "파스텔 멀티컬러",
    style: "팝 & 플레이풀",
    gradient: "from-pink-500 to-orange-400",
    accentBg: "bg-pink-50",
    accentText: "text-pink-700",
    accentBorder: "border-pink-200",
    link: "https://www.olly.com",
    img: "https://images.unsplash.com/photo-1535185384036-28bbc8035f28?w=400&h=400&fit=crop",
    features: [
      "밝고 경쾌한 파스텔 컬러",
      "젤리/구미 형태 — 친근한 이미지",
      "귀여운 일러스트레이션",
      "MZ세대 타겟의 정석",
    ],
    lesson: "장펴내가 2030 타겟이라면 참고할 톤. 단, 코르티솔 관리는 '안정감'이 중요하므로 너무 밝으면 역효과.",
    designScore: 78,
  },
  {
    name: "듀오락 (CJ 바이오)",
    country: "🇰🇷 한국",
    category: "프로바이오틱스",
    price: "₩25,000~50,000",
    colors: ["#7C3AED", "#FFFFFF", "#E5E7EB"],
    colorNames: "퍼플 + 화이트",
    style: "사이언스 프리미엄",
    gradient: "from-purple-700 to-violet-800",
    accentBg: "bg-purple-50",
    accentText: "text-purple-800",
    accentBorder: "border-purple-200",
    link: "https://www.duolac.com",
    img: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop",
    features: [
      "퍼플 + 화이트 조합",
      "균주 시각화 그래픽 (과학적 이미지)",
      "CJ 바이오 기술력 강조",
      "라인업별 컬러 코딩",
    ],
    lesson: "균주 시각화는 과학적 신뢰를 준다. 장펴내도 '세르티솔 관리 메커니즘' 인포그래픽 활용 가능.",
    designScore: 80,
  },
];

const recommendations = [
  {
    title: "컬러 조합",
    icon: "🎨",
    options: [
      {
        name: "딥 네이비 + 골드",
        desc: "코르티솔(스트레스 관리) = 안정감 + 신뢰 → 블루 계열 최적",
        colors: ["#1A1A4E", "#C9A84C"],
        score: "★★★★★",
      },
      {
        name: "매트 블랙 + 골드",
        desc: "최상위 프리미엄 — AG1 스타일",
        colors: ["#1A1A1A", "#C9A84C"],
        score: "★★★★☆",
      },
      {
        name: "소프트 라벤더 + 화이트",
        desc: "스트레스 완화 이미지 — 차별화 가능",
        colors: ["#9B8EC4", "#FFFFFF"],
        score: "★★★★☆",
      },
    ],
  },
  {
    title: "마감/재질",
    icon: "✋",
    options: [
      { name: "무광(매트) 마감", desc: "유광은 저렴해 보임 — 매트가 고급감의 기본", colors: [], score: "필수" },
      { name: "엠보싱/박(箔) 처리 로고", desc: "손으로 만졌을 때 질감 — 촉각적 프리미엄", colors: [], score: "강추" },
      { name: "알루미늄 차단 개별 스틱팩", desc: "유산균 생존율 + 고급감 동시 확보", colors: [], score: "필수" },
    ],
  },
  {
    title: "타이포그래피",
    icon: "🔤",
    options: [
      { name: "본문: 깔끔한 산세리프", desc: "Pretendard, Noto Sans KR — 가독성 + 모던함", colors: [], score: "기본" },
      { name: "브랜드명: 캘리그래피 or 커스텀 서체", desc: "'장펴내' 로고타입 차별화", colors: [], score: "강추" },
      { name: "핵심 정보만 전면에", desc: "균주 수, 핵심 기능 1~2개 — 나머지는 후면", colors: [], score: "필수" },
    ],
  },
  {
    title: "구조 설계",
    icon: "📦",
    options: [
      { name: "전면", desc: "브랜드명 + 한 줄 카피 + 핵심 숫자(100억 CFU 등) — 여백 많이", colors: [], score: "" },
      { name: "후면", desc: "성분표, 인증마크(건기식 인증), QR코드", colors: [], score: "" },
      { name: "개봉 경험", desc: "박스 뚜껑 안쪽에 브랜드 스토리 / 인사말", colors: [], score: "" },
    ],
  },
];

export default function DesignRefPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white font-black text-xs shadow-sm">Z</div>
            <span className="font-bold text-gray-900 text-sm">zooin Reports</span>
          </a>
          <span className="text-xs text-gray-400 font-mono">Design Reference</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-900">
        <div className="max-w-5xl mx-auto px-5 py-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono bg-white/20 text-white px-2 py-0.5 rounded">DESIGN REF</span>
            <span className="text-xs font-semibold bg-white/20 text-white px-2.5 py-0.5 rounded-full">🎨 디자인 레퍼런스</span>
          </div>
          <h1 className="text-white text-2xl sm:text-3xl font-bold leading-snug mb-3">
            장펴내 세르티솔 유산균 — 고급 패키지 디자인 레퍼런스
          </h1>
          <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
            국내외 프리미엄 유산균 / 건강기능식품 8개 브랜드의 패키지 디자인을 분석하고,
            &quot;장펴내 세르티솔&quot;에 적용할 최적의 디자인 전략을 제안합니다.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {["유산균", "건강기능식품", "패키지디자인", "프리미엄", "코르티솔", "장펴내"].map(t => (
              <span key={t} className="text-[11px] bg-white/15 text-white/80 border border-white/20 rounded-full px-2.5 py-0.5">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Cards Grid */}
      <main className="max-w-5xl mx-auto px-5 py-10">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-violet-600 rounded-full inline-block"></span>
          브랜드별 디자인 분석
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {brands.map((brand) => (
            <div key={brand.name} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Brand Header */}
              <div className={`bg-gradient-to-r ${brand.gradient} p-5`}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] text-white/60 font-mono">{brand.country}</span>
                    <h3 className="text-white font-bold text-lg mt-0.5">{brand.name}</h3>
                    <p className="text-white/70 text-xs mt-1">{brand.category} · {brand.price}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="bg-white/20 rounded-lg px-2.5 py-1">
                      <span className="text-white font-bold text-lg">{brand.designScore}</span>
                      <span className="text-white/60 text-[10px] ml-0.5">/100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Palette */}
              <div className="px-5 pt-4 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] text-gray-400 font-mono">COLOR</span>
                  <div className="flex gap-1">
                    {brand.colors.map((c, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border border-gray-200 shadow-sm"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-500 ml-1">{brand.colorNames}</span>
                </div>
                <div className={`text-[10px] ${brand.accentText} ${brand.accentBg} border ${brand.accentBorder} rounded-full px-2.5 py-0.5 inline-block`}>
                  {brand.style}
                </div>
              </div>

              {/* Features */}
              <div className="px-5 py-3">
                <ul className="space-y-1.5">
                  {brand.features.map((f, i) => (
                    <li key={i} className="text-[13px] text-gray-600 flex items-start gap-2">
                      <span className="text-gray-300 mt-0.5">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lesson */}
              <div className="px-5 pb-4">
                <div className="bg-violet-50 border border-violet-100 rounded-xl p-3">
                  <p className="text-[12px] text-violet-700 leading-relaxed">
                    <span className="font-bold">💡 장펴내 적용 포인트:</span> {brand.lesson}
                  </p>
                </div>
              </div>

              {/* Link */}
              <div className="border-t border-gray-100 px-5 py-3 flex justify-between items-center">
                <a
                  href={brand.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-violet-600 hover:text-violet-800 font-medium flex items-center gap-1"
                >
                  공식 사이트 방문 →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations Section */}
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-emerald-600 rounded-full inline-block"></span>
          장펴내 세르티솔 — 추천 디자인 전략
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {recommendations.map((rec) => (
            <div key={rec.title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
                <span className="text-xl">{rec.icon}</span> {rec.title}
              </h3>
              <div className="space-y-3">
                {rec.options.map((opt, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-3 hover:border-violet-200 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] font-semibold text-gray-800">{opt.name}</span>
                      {opt.score && (
                        <span className="text-[11px] text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full font-medium">{opt.score}</span>
                      )}
                    </div>
                    <p className="text-[12px] text-gray-500 leading-relaxed">{opt.desc}</p>
                    {opt.colors.length > 0 && (
                      <div className="flex gap-1.5 mt-2">
                        {opt.colors.map((c, ci) => (
                          <div
                            key={ci}
                            className="w-8 h-8 rounded-lg border border-gray-200 shadow-sm"
                            style={{ backgroundColor: c }}
                            title={c}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Final Recommendation */}
        <div className="bg-gradient-to-br from-indigo-900 to-violet-900 rounded-2xl p-8 text-center mb-10">
          <h2 className="text-white text-xl font-bold mb-3">🏆 최종 추천</h2>
          <p className="text-white/80 text-sm max-w-xl mx-auto leading-relaxed mb-6">
            &quot;장펴내 세르티솔&quot;은 스트레스+장건강이라는 독특한 콘셉트.<br />
            <strong className="text-white">딥네이비/블루 + 골드 + 매트 마감</strong>으로
            &quot;안정감 있는 프리미엄&quot;을 잡는 것이 가장 강력합니다.
          </p>
          <div className="flex justify-center gap-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl shadow-lg border-2 border-white/20" style={{ backgroundColor: "#1A1A4E" }}></div>
              <span className="text-white/60 text-[11px] mt-2">딥 네이비</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl shadow-lg border-2 border-white/20" style={{ backgroundColor: "#C9A84C" }}></div>
              <span className="text-white/60 text-[11px] mt-2">골드</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl shadow-lg border-2 border-white/20" style={{ backgroundColor: "#FFFFFF" }}></div>
              <span className="text-white/60 text-[11px] mt-2">화이트</span>
            </div>
          </div>
          <p className="text-white/50 text-[11px] mt-6">뉴트리원 + AG1 스타일 벤치마킹 → 한국 시장 최적화</p>
        </div>

        {/* Reference Links */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-10">
          <h3 className="font-bold text-gray-900 text-base mb-4">🔗 추가 레퍼런스 링크</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: "Behance — 프리미엄 유산균 패키지", url: "https://www.behance.net/search/projects?search=premium%20probiotics%20packaging%20design" },
              { name: "Pinterest — 고급 유산균 디자인", url: "https://www.pinterest.com/search/pins/?q=premium+probiotics+packaging+design+luxury" },
              { name: "Pinterest — 한국 건기식 패키지", url: "https://www.pinterest.com/search/pins/?q=korean+health+supplement+premium+packaging" },
              { name: "Seed — 친환경 혁신 패키지", url: "https://seed.com" },
              { name: "Ritual — 투명 미니멀", url: "https://ritual.com" },
              { name: "AG1 — 럭셔리 건강식품", url: "https://drinkag1.com" },
              { name: "Olly — MZ세대 건강식품", url: "https://www.olly.com" },
              { name: "DesignerPeople — 서플먼트 디자인 가이드", url: "https://www.designerpeople.com/blog/health-supplement-packaging-design/" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-violet-200 hover:bg-violet-50 transition-all text-[13px] text-gray-700 hover:text-violet-700"
              >
                <span className="text-gray-400">🔗</span>
                {link.name}
                <span className="ml-auto text-gray-300">→</span>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center text-[11px] text-gray-300 font-mono py-4">
          zooin Design Reference · 2026-04-06
        </div>
      </main>
    </div>
  );
}
