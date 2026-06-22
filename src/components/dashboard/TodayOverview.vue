<script setup>
import ActivityList from '../activities/ActivityList.vue'

defineProps({
  activities: {
    type: Array,
    default: () => [],
  },
  categories: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['toggle-completed', 'edit', 'delete', 'toggle-routine-item'])
</script>

<template>
  <ActivityList
    :activities="activities"
    :categories="categories"
    empty-title="Tu dia esta despejado"
    empty-message="Agrega una actividad para empezar a organizarlo."
    @toggle-completed="$emit('toggle-completed', $event)"
    @toggle-routine-item="$emit('toggle-routine-item', $event)"
    @edit="$emit('edit', $event)"
    @delete="$emit('delete', $event)"
  />
</template>
