function TimerCard({
  activeTask,
  secondsLeft,
  isRunning,
  timerDone,
  onStart,
  onPause,
  onResume,
  onReset,
}) {
  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const timeLabel = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  return (
    <section className="rounded-2xl border border-cyan-400/20 bg-slate-900/40 p-4 shadow-xl shadow-slate-950/40 backdrop-blur md:p-5">
      <h2 className="text-lg font-semibold text-white">Focus Countdown</h2>
      <p className="mt-2 text-sm text-cyan-100/80">
        {activeTask ? `Active: ${activeTask.title}` : 'Pick a task and start timer'}
      </p>
      <p className="mt-4 text-4xl font-bold tracking-wide text-emerald-300">{timeLabel}</p>
      {timerDone && <p className="mt-2 text-sm text-emerald-200">Mission time complete.</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onStart}
          disabled={!activeTask || isRunning || secondsLeft === 0}
        >
          Start
        </button>
        <button
          type="button"
          className="rounded-lg bg-amber-400 px-3 py-2 text-sm font-semibold text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onPause}
          disabled={!isRunning}
        >
          Pause
        </button>
        <button
          type="button"
          className="rounded-lg bg-emerald-400 px-3 py-2 text-sm font-semibold text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onResume}
          disabled={!activeTask || isRunning || secondsLeft === 0}
        >
          Resume
        </button>
        <button
          type="button"
          className="rounded-lg bg-slate-700 px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onReset}
          disabled={!activeTask}
        >
          Reset
        </button>
      </div>
    </section>
  )
}

export default TimerCard
