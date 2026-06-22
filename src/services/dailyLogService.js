import { readCollection, writeCollection } from './storageService'

const STORAGE_KEY = 'dayflow.dailyLogs'

export const dailyLogService = {
  list() {
    return readCollection(STORAGE_KEY)
  },
  save(logs) {
    writeCollection(STORAGE_KEY, logs)
  },
}
