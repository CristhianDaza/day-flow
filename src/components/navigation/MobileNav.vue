<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/activities', label: 'Actividad' },
  { to: '/tasks', label: 'Tareas' },
  { to: '/daily-log', label: 'Diario' },
]

function isActive(path) {
  return path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <nav class="mobile-nav" aria-label="Navegacion movil">
    <RouterLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      :class="{ 'is-active': isActive(link.to) }"
    >
      {{ link.label }}
    </RouterLink>
  </nav>
</template>
