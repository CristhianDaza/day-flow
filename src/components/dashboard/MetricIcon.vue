<script setup>
defineProps({
  name: {
    type: String,
    default: 'plan',
  },
})
</script>

<template>
  <svg
    v-if="name === 'plan' || name === 'dashboard'"
    class="metric-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
  >
    <rect x="4" y="5" width="6" height="6" rx="1.5" />
    <rect x="14" y="5" width="6" height="6" rx="1.5" />
    <rect x="4" y="15" width="6" height="4" rx="1.5" />
    <path d="M14 17h6" />
  </svg>

  <svg
    v-else-if="name === 'activity'"
    class="metric-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
  >
    <path d="M5 7h14" />
    <path d="M5 12h10" />
    <path d="M5 17h7" />
    <path d="M18 15v4" />
    <path d="M16 17h4" />
  </svg>

  <svg
    v-else-if="name === 'habit'"
    class="metric-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
  >
    <path d="M7 12a5 5 0 0 1 8.5-3.5L17 10" />
    <path d="M17 6v4h-4" />
    <path d="M17 12a5 5 0 0 1-8.5 3.5L7 14" />
    <path d="M7 18v-4h4" />
  </svg>

  <svg
    v-else-if="name === 'task'"
    class="metric-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
  >
    <path d="m5 12 3 3 5-6" />
    <path d="M14 7h5" />
    <path d="M14 12h5" />
    <path d="M14 17h5" />
  </svg>

  <svg
    v-else-if="name === 'reminder'"
    class="metric-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
  >
    <path d="M6 9a6 6 0 0 1 12 0c0 7 2 7 2 9H4c0-2 2-2 2-9" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>

  <svg
    v-else-if="name === 'routine'"
    class="metric-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
  >
    <path d="M6 6h12" />
    <path d="M6 12h12" />
    <path d="M6 18h12" />
    <circle cx="6" cy="6" r="1.5" />
    <circle cx="6" cy="12" r="1.5" />
    <circle cx="6" cy="18" r="1.5" />
  </svg>

  <svg
    v-else-if="name === 'pending'"
    class="metric-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
  >
    <circle cx="12" cy="12" r="8" />
    <path d="M12 7v5l3.5 2" />
  </svg>

  <svg
    v-else-if="name === 'done'"
    class="metric-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
  >
    <circle cx="12" cy="12" r="8" />
    <path d="m8.5 12.2 2.3 2.3 4.9-5" />
  </svg>

  <svg
    v-else-if="name === 'filter'"
    class="metric-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
  >
    <path d="M5 7h14" />
    <path d="M8 12h8" />
    <path d="M11 17h2" />
  </svg>

  <svg
    v-else-if="name === 'category'"
    class="metric-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
  >
    <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H10l2 2h5.5A2.5 2.5 0 0 1 20 9.5v7A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5z" />
  </svg>

  <svg
    v-else-if="name === 'log'"
    class="metric-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
  >
    <path d="M7 4h7l3 3v13H7z" />
    <path d="M14 4v4h4" />
    <path d="M9 12h6" />
    <path d="M9 16h4" />
  </svg>

  <svg v-else class="metric-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none">
    <rect x="5" y="5" width="14" height="14" rx="3" />
    <path d="M8 10h8" />
    <path d="M8 14h5" />
  </svg>
</template>
