<script setup>
import { computed } from 'vue'
import BaseButton from '../base/BaseButton.vue'
import ActivityStatusBadge from './ActivityStatusBadge.vue'
import { PRIORITY_LABELS, REPEAT_LABELS, TYPE_LABELS } from '../../constants/activityTypes'
import { formatDisplayDate, isBeforeNow } from '../../utils/dates'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
  category: Object,
})

defineEmits(['toggle-completed', 'toggle-routine-item', 'edit', 'delete'])

const overdue = computed(
  () =>
    props.activity.type === 'reminder' &&
    !props.activity.completed &&
    isBeforeNow(props.activity.date, props.activity.time),
)
</script>

<template>
  <article class="activity-card" :class="{ 'is-completed': activity.completed }">
    <div class="activity-card__main">
      <span class="category-dot" :style="{ backgroundColor: category?.color || '#38bdf8' }" />
      <div>
        <div class="activity-card__header">
          <h3>{{ activity.title }}</h3>
          <ActivityStatusBadge :completed="activity.completed" :overdue="overdue" />
        </div>
        <p v-if="activity.description" class="muted">{{ activity.description }}</p>
        <div class="activity-meta">
          <span>{{ TYPE_LABELS[activity.type] }}</span>
          <span>{{ activity.category }}</span>
          <span>{{ PRIORITY_LABELS[activity.priority] }}</span>
          <span>{{ formatDisplayDate(activity.date) }}</span>
          <span v-if="activity.time">{{ activity.time }}</span>
          <span>{{ REPEAT_LABELS[activity.repeat] }}</span>
        </div>
      </div>
    </div>

    <div v-if="activity.type === 'routine' && activity.routineItems.length" class="routine-items">
      <label v-for="item in activity.routineItems" :key="item.id" class="routine-item">
        <input
          type="checkbox"
          :checked="item.completed"
          @change="$emit('toggle-routine-item', { activityId: activity.id, itemId: item.id })"
        />
        <span>{{ item.title }}</span>
      </label>
    </div>

    <div class="activity-actions">
      <BaseButton variant="ghost" @click="$emit('toggle-completed', activity.id)">
        {{ activity.completed ? 'Reabrir' : 'Completar' }}
      </BaseButton>
      <BaseButton variant="secondary" @click="$emit('edit', activity)">Editar</BaseButton>
      <BaseButton variant="danger" @click="$emit('delete', activity.id)">Eliminar</BaseButton>
    </div>
  </article>
</template>
