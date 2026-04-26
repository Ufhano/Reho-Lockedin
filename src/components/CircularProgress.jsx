function CircularProgress({ percentage, completed, total, level, xp }) {
  const size = 220
  const stroke = 16
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative mx-auto flex h-[220px] w-[220px] items-center justify-center sm:h-[240px] sm:w-[240px]">
      <svg className="-rotate-90" width={size} height={size}>
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#111827" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e2e8f0" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#ringGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>

      <div className="absolute text-center">
        <p className="text-3xl font-black text-slate-900">
          {completed} / {total}
        </p>
        <p className="text-sm font-semibold text-zinc-700">{percentage}% complete</p>
        <p className="mt-1 text-xs font-medium text-slate-500">Level {level}</p>
        <p className="text-xs font-medium text-slate-500">{xp} Lock-In XP</p>
      </div>
    </div>
  )
}

export default CircularProgress
