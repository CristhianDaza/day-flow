<script setup>
defineProps({
  completed: Boolean,
  overdue: Boolean,
})
</script>

<template>
  <span class="status-badge" :class="{ 'is-done': completed, 'is-overdue': overdue }">
    {{ completed ? 'Completada' : overdue ? 'Vencida' : 'Pendiente' }}
  </span>
</template>
