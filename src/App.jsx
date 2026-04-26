import { useEffect, useMemo, useState } from 'react'
import AddTaskForm from './components/AddTaskForm'
import HeroDashboard from './components/HeroDashboard'
import RewardsStore from './components/RewardsStore'
import TaskList from './components/TaskList'
import TimerCard from './components/TimerCard'
import {
  DAILY_GOAL,
  STORAGE_KEY,
  getDateKey,
  getLevelFromXp,
  getYesterdayKey,
  rewardItems,
  starterTasks,
} from './utils'

const createInitialState = () => ({
  tasks: starterTasks,
  totalXp: 0,
  coins: 0,
  streak: 0,
  dailyCompletionsDate: getDateKey(),
  dailyCompletionsCount: 0,
  streakLastAwardedDate: null,
})

function App() {
  const [state, setState] = useState(() => {
    // localStorage loading: if saved state exists, restore it; else use starter data.
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : createInitialState()
  })
  const [activeTaskId, setActiveTaskId] = useState(null)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [initialSeconds, setInitialSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [timerDone, setTimerDone] = useState(false)
  const [flashMessage, setFlashMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  // localStorage saving: save any update to tasks, XP, coins, or streak data.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  // Timer countdown: when running, decrease each second; stop at zero.
  useEffect(() => {
    if (!isRunning) return undefined
    const interval = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          clearInterval(interval)
          setIsRunning(false)
          setTimerDone(true)
          return 0
        }
        return current - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    if (!flashMessage) return undefined
    const timeout = setTimeout(() => setFlashMessage(''), 2800)
    return () => clearTimeout(timeout)
  }, [flashMessage])

  const level = getLevelFromXp(state.totalXp)
  const completedTasks = state.tasks.filter((task) => task.completed).length
  const totalTasks = state.tasks.length
  const percent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0
  const activeTask = state.tasks.find((task) => task.id === activeTaskId) ?? null

  const matchesFilters = (task) => {
    const titleMatch = task.title.toLowerCase().includes(searchTerm.toLowerCase())
    const priorityMatch = priorityFilter === 'All' || task.priority === priorityFilter
    const statusMatch =
      statusFilter === 'All' ||
      (statusFilter === 'Completed' && task.completed) ||
      (statusFilter === 'Pending' && !task.completed)
    return titleMatch && priorityMatch && statusMatch
  }

  const mustDoTasks = useMemo(
    () => state.tasks.filter((task) => task.category === 'must' && matchesFilters(task)),
    [state.tasks, searchTerm, priorityFilter, statusFilter],
  )
  const sideQuestTasks = useMemo(
    () => state.tasks.filter((task) => task.category === 'side' && matchesFilters(task)),
    [state.tasks, searchTerm, priorityFilter, statusFilter],
  )

  const showMessage = (message) => {
    setFlashMessage(message)
  }

  const addTask = (taskInput) => {
    const task = {
      id: crypto.randomUUID(),
      ...taskInput,
      completed: false,
    }
    setState((prev) => ({ ...prev, tasks: [task, ...prev.tasks] }))
  }

  const deleteTask = (taskId) => {
    setState((prev) => ({ ...prev, tasks: prev.tasks.filter((task) => task.id !== taskId) }))
    if (activeTaskId === taskId) {
      setActiveTaskId(null)
      setIsRunning(false)
      setSecondsLeft(0)
      setInitialSeconds(0)
    }
  }

  const updateTask = (taskId, patch) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) => (task.id === taskId ? { ...task, ...patch } : task)),
    }))
    if (taskId === activeTaskId && patch.estimatedMinutes) {
      const next = Number(patch.estimatedMinutes) * 60
      setInitialSeconds(next)
      setSecondsLeft(next)
      setIsRunning(false)
      setTimerDone(false)
    }
    showMessage('Task updated.')
  }

  const completeTask = (taskId) => {
    const today = getDateKey()
    const yesterday = getYesterdayKey()

    setState((prev) => {
      const task = prev.tasks.find((entry) => entry.id === taskId)
      if (!task || task.completed) return prev

      const updatedTasks = prev.tasks.map((entry) =>
        entry.id === taskId ? { ...entry, completed: true } : entry,
      )

      const sameDayCompletions =
        prev.dailyCompletionsDate === today ? prev.dailyCompletionsCount : 0
      const newDailyCompletions = sameDayCompletions + 1

      let nextStreak = prev.streak
      let streakLastAwardedDate = prev.streakLastAwardedDate

      // Streak calculation: gain streak only when 3+ tasks are completed for that date.
      if (newDailyCompletions >= DAILY_GOAL && prev.streakLastAwardedDate !== today) {
        if (prev.streakLastAwardedDate === yesterday) {
          nextStreak += 1
        } else {
          nextStreak = 1
        }
        streakLastAwardedDate = today
      }

      showMessage(`Task cleared. +${task.xpReward} XP earned.`)

      return {
        ...prev,
        tasks: updatedTasks,
        totalXp: prev.totalXp + task.xpReward,
        coins: prev.coins + task.coinReward,
        streak: nextStreak,
        dailyCompletionsDate: today,
        dailyCompletionsCount: newDailyCompletions,
        streakLastAwardedDate,
      }
    })
  }

  const startTaskTimer = (taskId) => {
    const task = state.tasks.find((entry) => entry.id === taskId)
    if (!task) return
    const time = task.estimatedMinutes * 60
    setActiveTaskId(taskId)
    setSecondsLeft(time)
    setInitialSeconds(time)
    setIsRunning(true)
    setTimerDone(false)
  }

  const redeemReward = (reward) => {
    setState((prev) => {
      if (prev.coins < reward.cost) {
        showMessage('Not enough Focus Coins yet.')
        return prev
      }

      showMessage('Reward unlocked.')
      return { ...prev, coins: prev.coins - reward.cost }
    })
  }

  const resetTimer = () => {
    setIsRunning(false)
    setSecondsLeft(initialSeconds)
    setTimerDone(false)
  }

  const resetDay = () => {
    const today = getDateKey()
    // Reset day action: clears completion state for a fresh day while keeping XP/coins history.
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) => ({ ...task, completed: false })),
      dailyCompletionsDate: today,
      dailyCompletionsCount: 0,
    }))
    setActiveTaskId(null)
    setIsRunning(false)
    setTimerDone(false)
    setInitialSeconds(0)
    setSecondsLeft(0)
    showMessage('New day reset complete. Missions are fresh.')
  }

  return (
    <main className="min-h-screen bg-transparent px-3 py-4 text-slate-900 sm:px-4 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-5 md:space-y-6">
        <HeroDashboard
          completed={completedTasks}
          total={totalTasks}
          percent={percent}
          level={level}
          totalXp={state.totalXp}
          onSeeReport={() =>
            showMessage(
              `Report: ${completedTasks}/${totalTasks} tasks cleared, ${state.totalXp} XP, ${state.coins} Focus Coins.`,
            )
          }
        />

        {flashMessage && (
          <div className="sticky top-3 z-20 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm shadow-slate-200/70 backdrop-blur">
            {flashMessage}
          </div>
        )}

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <TimerCard
            activeTask={activeTask}
            secondsLeft={secondsLeft}
            isRunning={isRunning}
            timerDone={timerDone}
            onStart={() => setIsRunning(true)}
            onPause={() => setIsRunning(false)}
            onResume={() => setIsRunning(true)}
            onReset={resetTimer}
          />
          <RewardsStore rewards={rewardItems} coins={state.coins} onRedeem={redeemReward} />
        </section>

        <section className="premium-card">
          <h2 className="text-lg font-bold text-slate-900">Streak Card</h2>
          <p className="mt-1 text-sm text-slate-600">Current streak: {state.streak}</p>
          <p className="text-sm font-medium text-slate-700">Daily goal: Clear {DAILY_GOAL} missions today</p>
          <p className="mt-2 text-xs text-slate-500">
            Today: {state.dailyCompletionsDate === getDateKey() ? state.dailyCompletionsCount : 0}/
            {DAILY_GOAL} completed
          </p>
          <button
            type="button"
            className="premium-btn mt-3 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            onClick={resetDay}
          >
            Reset Day
          </button>
        </section>

        <AddTaskForm onAddTask={addTask} />

        <section className="premium-card">
          <h2 className="text-lg font-bold text-slate-900">Filter Missions</h2>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="premium-input"
              placeholder="Search by task title"
            />
            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
              className="premium-input"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="premium-input"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <TaskList
            title="Must-Do Missions"
            tasks={mustDoTasks}
            onComplete={completeTask}
            onDelete={deleteTask}
            onStartTimer={startTaskTimer}
            onUpdate={updateTask}
          />
          <TaskList
            title="Side Quests"
            tasks={sideQuestTasks}
            onComplete={completeTask}
            onDelete={deleteTask}
            onStartTimer={startTaskTimer}
            onUpdate={updateTask}
          />
        </section>
      </div>
    </main>
  )
}

export default App
