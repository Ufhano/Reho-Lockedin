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
    <section className="premium-card">
      <h2 className="text-lg font-bold text-slate-900">Focus Countdown</h2>
      <p className="mt-2 text-sm text-slate-500">
        {activeTask ? `Active: ${activeTask.title}` : 'Pick a task and start timer'}
      </p>
      <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-4 text-center text-4xl font-black tracking-[0.08em] text-slate-800 md:text-5xl">
        {timeLabel}
      </p>
      {timerDone && <p className="mt-2 text-sm font-medium text-slate-700">Mission time complete.</p>}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button
          type="button"
          className="premium-btn bg-zinc-900 text-white shadow-sm hover:bg-zinc-800"
          onClick={onStart}
          disabled={!activeTask || isRunning || secondsLeft === 0}
        >
          Start
        </button>
        <button
          type="button"
          className="premium-btn border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          onClick={onPause}
          disabled={!isRunning}
        >
          Pause
        </button>
        <button
          type="button"
          className="premium-btn border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          onClick={onResume}
          disabled={!activeTask || isRunning || secondsLeft === 0}
        >
          Resume
        </button>
        <button
          type="button"
          className="premium-btn bg-slate-100 text-slate-600 hover:bg-slate-200"
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
