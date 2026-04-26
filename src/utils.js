export const STORAGE_KEY = 'reho-lock-in-state'
export const DAILY_GOAL = 3

export const starterTasks = [
  {
    id: crypto.randomUUID(),
    title: 'Study for test',
    category: 'must',
    priority: 'High',
    estimatedMinutes: 45,
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    title: 'Finish assignment',
    category: 'must',
    priority: 'High',
    estimatedMinutes: 30,
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    title: 'Organize notes',
    category: 'side',
    priority: 'Medium',
    estimatedMinutes: 15,
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    title: 'Clean room',
    category: 'side',
    priority: 'Low',
    estimatedMinutes: 20,
    completed: false,
  },
]

export const rewardItems = [
  { id: 'break', label: '15 minute break', cost: 50 },
  { id: 'chill', label: 'chill break', cost: 100 },
  { id: 'entertainment', label: 'entertainment time', cost: 150 },
]

export const getLevelFromXp = (xp) => Math.floor(xp / 100) + 1

export const getDateKey = (date = new Date()) => {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const getYesterdayKey = () => {
  const value = new Date()
  value.setDate(value.getDate() - 1)
  return getDateKey(value)
}

export const calculateTaskRewards = (task) => {
  const estimatedTime = Number(task.estimatedTime ?? task.estimatedMinutes ?? 0)
  const multiplier =
    task.priority === 'High' ? 1.5 : task.priority === 'Medium' ? 1.2 : 1
  const xp = Math.round(estimatedTime * multiplier)
  const coins = Math.round(xp / 2)
  return { xp, coins }
}
