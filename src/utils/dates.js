export function getTodayDate() {
  const now = new Date()
  return formatDateInput(now)
}

export function formatDateInput(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getNowIso() {
  return new Date().toISOString()
}

export function formatDisplayDate(value) {
  if (!value) return 'Sin fecha'
  const [year, month, day] = value.split('-').map(Number)
  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(year, month - 1, day))
}

export function isBeforeNow(date, time) {
  if (!date || !time) return false
  return new Date(`${date}T${time}`) < new Date()
}
