<script setup>
defineProps({
  label: String,
  value: [String, Number],
  tone: {
    type: String,
    default: 'blue',
  },
})
</script>

<template>
  <article class="summary-card" :class="`summary-card--${tone}`">
    <span>{{ label }}</span>
    <strong>{{ value }}</strong>
  </article>
</template>
