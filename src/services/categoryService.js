import { DEFAULT_CATEGORIES } from '../constants/categories'
import { getNowIso } from '../utils/dates'
import { readCollection, writeCollection } from './storageService'

const STORAGE_KEY = 'dayflow.categories'

function withTimestamps(category) {
  const now = getNowIso()
  return {
    ...category,
    createdAt: category.createdAt || now,
    updatedAt: category.updatedAt || now,
  }
}

export const categoryService = {
  list() {
    const savedCategories = readCollection(STORAGE_KEY, null)
    if (Array.isArray(savedCategories) && savedCategories.length) {
      return savedCategories
    }

    const defaults = DEFAULT_CATEGORIES.map(withTimestamps)
    writeCollection(STORAGE_KEY, defaults)
    return defaults
  },
  save(categories) {
    writeCollection(STORAGE_KEY, categories)
  },
}
