<script setup>
const links = [
  { to: '/', label: 'Inicio' },
  { to: '/activities', label: 'Actividad' },
  { to: '/tasks', label: 'Tareas' },
  { to: '/daily-log', label: 'Diario' },
]
</script>

<template>
  <nav class="mobile-nav" aria-label="Navegacion movil">
    <RouterLink v-for="link in links" :key="link.to" :to="link.to">
      {{ link.label }}
    </RouterLink>
  </nav>
</template>
