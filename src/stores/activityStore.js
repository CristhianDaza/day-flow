import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { activityService } from '../services/activityService'
import { createId } from '../utils/ids'
import { getNowIso, getTodayDate } from '../utils/dates'
import { filterActivities, sortActivitiesByTime } from '../utils/filters'

function normalizeActivity(payload) {
  const now = getNowIso()
  return {
    id: payload.id || createId('activity'),
    title: payload.title?.trim() || '',
    description: payload.description?.trim() || '',
    type: payload.type || 'task',
    category: payload.category || 'Otro',
    priority: payload.priority || 'medium',
    date: payload.date || getTodayDate(),
    time: payload.time || '',
    repeat: payload.repeat || 'none',
    completed: Boolean(payload.completed),
    routineItems: Array.isArray(payload.routineItems) ? payload.routineItems : [],
    createdAt: payload.createdAt || now,
    updatedAt: now,
  }
}

export const useActivityStore = defineStore('activities', () => {
  const activities = ref(activityService.list().map(normalizeActivity))

  const todayActivities = computed(() =>
    sortActivitiesByTime(filterActivities(activities.value, { date: getTodayDate() })),
  )

  function persist() {
    activityService.save(activities.value)
  }

  function createActivity(payload) {
    const activity = normalizeActivity(payload)
    activities.value.unshift(activity)
    persist()
    return activity
  }

  function updateActivity(id, payload) {
    const index = activities.value.findIndex((activity) => activity.id === id)
    if (index === -1) return null

    activities.value[index] = normalizeActivity({
      ...activities.value[index],
      ...payload,
      id,
      createdAt: activities.value[index].createdAt,
    })
    persist()
    return activities.value[index]
  }

  function deleteActivity(id) {
    activities.value = activities.value.filter((activity) => activity.id !== id)
    persist()
  }

  function toggleCompleted(id) {
    const activity = activities.value.find((item) => item.id === id)
    if (!activity) return

    activity.completed = !activity.completed
    activity.updatedAt = getNowIso()
    persist()
  }

  function toggleRoutineItem(activityId, itemId) {
    const activity = activities.value.find((item) => item.id === activityId)
    const routineItem = activity?.routineItems.find((item) => item.id === itemId)
    if (!activity || !routineItem) return

    routineItem.completed = !routineItem.completed
    activity.completed = activity.routineItems.every((item) => item.completed)
    activity.updatedAt = getNowIso()
    persist()
  }

  function reassignCategory(fromCategory, toCategory = 'Otro') {
    activities.value = activities.value.map((activity) =>
      activity.category === fromCategory
        ? { ...activity, category: toCategory, updatedAt: getNowIso() }
        : activity,
    )
    persist()
  }

  function getFilteredActivities(filters) {
    return sortActivitiesByTime(filterActivities(activities.value, filters))
  }

  function getStatsForDate(date) {
    const items = filterActivities(activities.value, { date })
    const completed = items.filter((activity) => activity.completed)
    const pending = items.filter((activity) => !activity.completed)

    return {
      total: items.length,
      completed: completed.length,
      pending: pending.length,
      progress: items.length ? Math.round((completed.length / items.length) * 100) : 0,
    }
  }

  return {
    activities,
    todayActivities,
    createActivity,
    updateActivity,
    deleteActivity,
    toggleCompleted,
    toggleRoutineItem,
    reassignCategory,
    getFilteredActivities,
    getStatsForDate,
  }
})
