<script setup>
defineProps({
  value: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <div class="progress-ring" :style="{ '--progress': `${value}%` }">
    <div>
      <strong>{{ value }}%</strong>
      <span>completado</span>
    </div>
  </div>
</template>
