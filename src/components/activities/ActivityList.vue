<script setup>
import ActivityCard from './ActivityCard.vue'
import EmptyState from '../base/EmptyState.vue'

const props = defineProps({
  activities: {
    type: Array,
    default: () => [],
  },
  categories: {
    type: Array,
    default: () => [],
  },
  emptyTitle: String,
  emptyMessage: String,
})

defineEmits(['toggle-completed', 'toggle-routine-item', 'edit', 'delete'])

function findCategory(name) {
  return props.categories.find((category) => category.name === name)
}
</script>

<template>
  <div class="activity-list">
    <EmptyState
      v-if="!activities.length"
      :title="emptyTitle || 'No hay actividades'"
      :message="emptyMessage || 'Ajusta los filtros o crea una nueva actividad.'"
    />

    <ActivityCard
      v-for="activity in activities"
      v-else
      :key="activity.id"
      :activity="activity"
      :category="findCategory(activity.category)"
      @toggle-completed="$emit('toggle-completed', $event)"
      @toggle-routine-item="$emit('toggle-routine-item', $event)"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)"
    />
  </div>
</template>
