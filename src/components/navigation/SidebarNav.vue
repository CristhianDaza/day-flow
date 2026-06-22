<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MetricIcon from '../dashboard/MetricIcon.vue'
import { useActivityStore } from '../../stores/activityStore'
import { formatDisplayDate, getTodayDate } from '../../utils/dates'

const route = useRoute()
const activityStore = useActivityStore()
const today = getTodayDate()

const sections = [
  {
    label: 'Hoy',
    links: [
      { to: '/', label: 'Dashboard', icon: 'dashboard' },
      { to: '/daily-log', label: 'Registro diario', icon: 'log' },
    ],
  },
  {
    label: 'Planificacion',
    links: [
      { to: '/activities', label: 'Actividades', icon: 'activity' },
      { to: '/habits', label: 'Habitos', icon: 'habit' },
      { to: '/tasks', label: 'Tareas', icon: 'task' },
      { to: '/reminders', label: 'Recordatorios', icon: 'reminder' },
      { to: '/routines', label: 'Rutinas', icon: 'routine' },
    ],
  },
  {
    label: 'Sistema',
    links: [{ to: '/categories', label: 'Categorias', icon: 'category' }],
  },
]

const todayStats = computed(() => activityStore.getStatsForDate(today))

function isActive(path) {
  return path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <aside class="sidebar">
    <RouterLink class="brand" to="/">
      <span class="brand__mark">D</span>
      <span>
        <strong>DayFlow</strong>
        <small>Organiza tu dia</small>
      </span>
    </RouterLink>

    <nav class="sidebar__nav" aria-label="Navegacion principal">
      <section v-for="section in sections" :key="section.label" class="sidebar__section">
        <p class="sidebar__section-title">{{ section.label }}</p>
        <RouterLink
          v-for="link in section.links"
          :key="link.to"
          :to="link.to"
          class="sidebar__link"
          :class="{ 'is-active': isActive(link.to) }"
        >
          <span class="sidebar__marker" aria-hidden="true">
            <MetricIcon :name="link.icon" />
          </span>
          <span>{{ link.label }}</span>
        </RouterLink>
      </section>
    </nav>

    <div class="sidebar__status">
      <span class="sidebar__status-label">{{ formatDisplayDate(today) }}</span>
      <strong>{{ todayStats.pending }} pendientes</strong>
      <div class="sidebar__meter" aria-hidden="true">
        <span :style="{ width: `${todayStats.progress}%` }" />
      </div>
      <small>{{ todayStats.progress }}% completado</small>
    </div>
  </aside>
</template>
