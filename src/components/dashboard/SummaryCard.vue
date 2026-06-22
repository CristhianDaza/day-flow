<script setup>
import MetricIcon from './MetricIcon.vue'

defineProps({
  label: String,
  value: [String, Number],
  detail: String,
  tone: {
    type: String,
    default: 'blue',
  },
  icon: {
    type: String,
    default: 'total',
  },
})
</script>

<template>
  <article class="summary-card" :class="`summary-card--${tone}`">
    <span class="summary-card__icon" :class="`summary-card__icon--${icon}`" aria-hidden="true">
      <MetricIcon :name="icon" />
    </span>
    <div class="summary-card__content">
      <span>{{ label }}</span>
      <strong>{{ value }}</strong>
      <small v-if="detail">{{ detail }}</small>
    </div>
  </article>
</template>
