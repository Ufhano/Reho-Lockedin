function Header({ level, totalXp, streak, coins }) {
  return (
    <header className="premium-card relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-slate-100 blur-3xl" />
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Reho Lock-In</p>
          <h1 className="mt-2 text-3xl font-black leading-tight text-slate-900 md:text-4xl">
            Enter focus mode.
            <span className="block text-slate-700">Clear the mission.</span>
          </h1>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold tracking-wide text-slate-700">
          LOCKED IN 🔒
        </span>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
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
    <div className="rounded-xl border border-white/5 bg-white/5 p-3.5">
      <p className="text-[11px] uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-slate-900 md:text-xl">{value}</p>
    </div>
  )
}

export default Header
