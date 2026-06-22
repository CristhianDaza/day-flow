<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  type: {
    type: String,
    default: 'button',
  },
})
</script>

<template>
  <button :type="type" class="base-button" :class="`base-button--${variant}`">
    <slot />
  </button>
</template>
