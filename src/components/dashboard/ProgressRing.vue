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
    <div class="progress-card__label">
      <span>Avance</span>
      <strong>{{ value }}%</strong>
    </div>
    <div class="progress-ring" :style="{ '--progress': `${value}%` }">
      <span />
    </div>
  </article>
</template>
