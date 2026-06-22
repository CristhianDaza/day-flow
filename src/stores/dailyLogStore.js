import { ref } from 'vue'
import { defineStore } from 'pinia'
import { dailyLogService } from '../services/dailyLogService'
import { createId } from '../utils/ids'
import { getNowIso } from '../utils/dates'

export const useDailyLogStore = defineStore('dailyLogs', () => {
  const logs = ref(dailyLogService.list())

  function persist() {
    dailyLogService.save(logs.value)
  }

  function getLogByDate(date) {
    return logs.value.find((log) => log.date === date) || null
  }

  function saveLog(date, content) {
    const existing = getLogByDate(date)
    const now = getNowIso()

    if (existing) {
      existing.content = content
      existing.updatedAt = now
    } else {
      logs.value.push({
        id: createId('log'),
        date,
        content,
        createdAt: now,
        updatedAt: now,
      })
    }

    persist()
  }

  return {
    logs,
    getLogByDate,
    saveLog,
  }
})
