export const STORAGE_KEY = 'reho-lock-in-state'
export const DAILY_GOAL = 3

export const starterTasks = [
  {
    id: crypto.randomUUID(),
    title: 'Study for test',
    category: 'must',
    priority: 'High',
    estimatedMinutes: 45,
    xpReward: 50,
    coinReward: 30,
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    title: 'Finish assignment',
    category: 'must',
    priority: 'High',
    estimatedMinutes: 30,
    xpReward: 35,
    coinReward: 20,
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    title: 'Organize notes',
    category: 'side',
    priority: 'Medium',
    estimatedMinutes: 15,
    xpReward: 10,
    coinReward: 10,
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    title: 'Clean room',
    category: 'side',
    priority: 'Low',
    estimatedMinutes: 20,
    xpReward: 15,
    coinReward: 10,
    completed: false,
  },
]

export const rewardItems = [
  { id: 'break', label: '15 minute break', cost: 50 },
  { id: 'episode', label: 'Watch one episode', cost: 100 },
  { id: 'gaming', label: 'Gaming time', cost: 150 },
  { id: 'chill', label: 'Chill session', cost: 200 },
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
