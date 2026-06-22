<script setup>
defineProps({
  value: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <article class="progress-card">
    <div class="progress-ring" :style="{ '--progress': `${value}%` }">
      <strong>{{ value }}%</strong>
      <span>completado</span>
    </div>
  </article>
</template>
