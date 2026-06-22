<script setup>
defineProps({
  title: {
    type: String,
    default: 'No hay datos todavia',
  },
  message: {
    type: String,
    default: 'Crea el primer elemento para verlo aqui.',
  },
})
</script>

<template>
  <div class="empty-state">
    <p class="empty-state__title">{{ title }}</p>
    <p>{{ message }}</p>
  </div>
</template>
