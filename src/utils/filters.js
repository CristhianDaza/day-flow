export function filterActivities(activities, filters = {}) {
  return activities.filter((activity) => {
    const matchesDate = !filters.date || activity.date === filters.date
    const matchesCategory = !filters.category || activity.category === filters.category
    const matchesType = !filters.type || activity.type === filters.type
    const matchesStatus =
      !filters.status ||
      (filters.status === 'completed' && activity.completed) ||
      (filters.status === 'pending' && !activity.completed)

    return matchesDate && matchesCategory && matchesType && matchesStatus
  })
}

export function sortActivitiesByTime(activities) {
  return [...activities].sort((a, b) => {
    const dateA = `${a.date || '9999-12-31'}T${a.time || '23:59'}`
    const dateB = `${b.date || '9999-12-31'}T${b.time || '23:59'}`
    return dateA.localeCompare(dateB)
  })
}
