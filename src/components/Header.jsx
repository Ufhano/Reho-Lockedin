function Header({ level, totalXp, streak, coins }) {
  return (
    <header className="rounded-2xl border border-cyan-400/20 bg-slate-900/40 p-4 shadow-2xl shadow-cyan-900/30 backdrop-blur md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Reho Lock-In</p>
          <h1 className="mt-1 text-3xl font-bold text-white md:text-4xl">Enter focus mode. Clear the mission.</h1>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-emerald-300/40 bg-emerald-400/20 px-3 py-1 text-sm font-semibold text-emerald-200">
          LOCKED IN 🔒
        </span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Level" value={level} />
        <Stat label="Lock-In XP" value={totalXp} />
        <Stat label="Current Streak" value={`${streak} day${streak === 1 ? '' : 's'}`} />
        <Stat label="Focus Coins" value={coins} />
      </div>
    </header>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-white/5 p-3">
      <p className="text-xs text-cyan-100/70">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  )
}

export default Header
