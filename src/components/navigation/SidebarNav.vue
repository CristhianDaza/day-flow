<script setup>
const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/activities', label: 'Actividades' },
  { to: '/habits', label: 'Habitos' },
  { to: '/tasks', label: 'Tareas' },
  { to: '/reminders', label: 'Recordatorios' },
  { to: '/routines', label: 'Rutinas' },
  { to: '/categories', label: 'Categorias' },
  { to: '/daily-log', label: 'Registro diario' },
]
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
      <RouterLink v-for="link in links" :key="link.to" :to="link.to">
        {{ link.label }}
      </RouterLink>
    </nav>
  </aside>
</template>
