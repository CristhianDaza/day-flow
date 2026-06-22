import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { categoryService } from '../services/categoryService'
import { createId } from '../utils/ids'
import { getNowIso } from '../utils/dates'
import { useActivityStore } from './activityStore'

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref(categoryService.list())

  const categoryOptions = computed(() =>
    categories.value.map((category) => ({ value: category.name, label: category.name })),
  )

  function persist() {
    categoryService.save(categories.value)
  }

  function createCategory(payload) {
    const now = getNowIso()
    const category = {
      id: createId('category'),
      name: payload.name.trim(),
      color: payload.color || '#38bdf8',
      createdAt: now,
      updatedAt: now,
    }

    categories.value.push(category)
    persist()
  }

  function updateCategory(id, payload) {
    const index = categories.value.findIndex((category) => category.id === id)
    if (index === -1) return

    const previousName = categories.value[index].name
    const nextName = payload.name.trim()
    categories.value[index] = {
      ...categories.value[index],
      name: nextName,
      color: payload.color || categories.value[index].color,
      updatedAt: getNowIso(),
    }

    if (previousName !== nextName) {
      useActivityStore().reassignCategory(previousName, nextName)
    }

    persist()
  }

  function deleteCategory(id) {
    const category = categories.value.find((item) => item.id === id)
    if (!category || category.name === 'Otro') return

    categories.value = categories.value.filter((item) => item.id !== id)
    useActivityStore().reassignCategory(category.name, 'Otro')
    persist()
  }

  function getCategoryByName(name) {
    return categories.value.find((category) => category.name === name)
  }

  return {
    categories,
    categoryOptions,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryByName,
  }
})
