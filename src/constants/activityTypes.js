export const ACTIVITY_TYPES = [
  { value: 'task', label: 'Tarea' },
  { value: 'habit', label: 'Habito' },
  { value: 'reminder', label: 'Recordatorio' },
  { value: 'routine', label: 'Rutina' },
]

export const PRIORITIES = [
  { value: 'low', label: 'Baja' },
  { value: 'medium', label: 'Media' },
  { value: 'high', label: 'Alta' },
]

export const REPEAT_OPTIONS = [
  { value: 'none', label: 'Sin repeticion' },
  { value: 'daily', label: 'Diaria' },
  { value: 'weekly', label: 'Semanal' },
  { value: 'monthly', label: 'Mensual' },
  { value: 'custom', label: 'Personalizada' },
]

export const TYPE_LABELS = Object.fromEntries(ACTIVITY_TYPES.map((type) => [type.value, type.label]))
export const PRIORITY_LABELS = Object.fromEntries(PRIORITIES.map((priority) => [priority.value, priority.label]))
export const REPEAT_LABELS = Object.fromEntries(REPEAT_OPTIONS.map((repeat) => [repeat.value, repeat.label]))
