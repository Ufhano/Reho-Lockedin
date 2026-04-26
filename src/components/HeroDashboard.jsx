import CircularProgress from './CircularProgress'

function HeroDashboard({ completed, total, percent, level, totalXp, onSeeReport }) {
  return (
    <section className="relative overflow-hidden rounded-[2.2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-white p-5 shadow-sm shadow-slate-200/70 md:p-8">
      <div className="absolute -right-16 top-8 h-36 w-36 rounded-full bg-slate-100/70 blur-3xl" />
      <div className="absolute -left-10 bottom-8 h-28 w-28 rounded-full bg-slate-100/70 blur-2xl" />

      <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="inline-flex rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
            LOCKED IN 🔒
          </span>
          <h1 className="mt-3 text-3xl font-black leading-tight text-slate-900 md:text-5xl">Welcome, Reho</h1>
          <p className="mt-2 text-base text-slate-500 md:text-lg">Ready to lock in today?</p>
          <button
            type="button"
            onClick={onSeeReport}
            className="premium-btn mt-5 bg-zinc-900 text-white shadow-sm hover:bg-zinc-800"
          >
            See Report
          </button>
          <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-4 h-6 w-6 rounded-full bg-slate-200/80" />
          <div className="absolute -right-2 bottom-8 h-4 w-4 rounded-full bg-slate-200/80" />
          <CircularProgress
            percentage={percent}
            completed={completed}
            total={total}
            level={level}
            xp={totalXp}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-9 left-0 h-16 w-full rounded-[100%] bg-white/80 blur-md" />
    </section>
  )
}

export default HeroDashboard
