import { readCollection, writeCollection } from './storageService'

const STORAGE_KEY = 'dayflow.activities'

export const activityService = {
  list() {
    return readCollection(STORAGE_KEY)
  },
  save(activities) {
    writeCollection(STORAGE_KEY, activities)
  },
}
