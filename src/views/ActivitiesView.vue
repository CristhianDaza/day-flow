<script setup>
import { computed, reactive, ref, watch } from 'vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseButton from '../components/base/BaseButton.vue'
import ActivityForm from '../components/activities/ActivityForm.vue'
import ActivityFilters from '../components/activities/ActivityFilters.vue'
import ActivityList from '../components/activities/ActivityList.vue'
import { useActivityStore } from '../stores/activityStore'
import { useCategoryStore } from '../stores/categoryStore'
import { getTodayDate } from '../utils/dates'

const props = defineProps({
  lockedType: String,
  viewTitle: {
    type: String,
    default: 'Actividades',
  },
  viewDescription: {
    type: String,
    default: 'Crea, filtra y administra cualquier seguimiento personal.',
  },
})

const activityStore = useActivityStore()
const categoryStore = useCategoryStore()
const showForm = ref(false)
const editingActivity = ref(null)

const filters = reactive({
  date: getTodayDate(),
  category: '',
  type: props.lockedType || '',
  status: '',
})

const filteredActivities = computed(() =>
  activityStore.getFilteredActivities({
    ...filters,
    type: props.lockedType || filters.type,
  }),
)

function saveActivity(payload) {
  if (editingActivity.value) {
    activityStore.updateActivity(editingActivity.value.id, payload)
    editingActivity.value = null
  } else {
    activityStore.createActivity(payload)
  }
  showForm.value = false
}

function editActivity(activity) {
  editingActivity.value = activity
  showForm.value = true
}

function updateFilters(nextFilters) {
  Object.assign(filters, nextFilters)
}

watch(
  () => props.lockedType,
  (type) => {
    filters.type = type || ''
  },
  { immediate: true },
)
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">DayFlow</p>
        <h1>{{ viewTitle }}</h1>
        <p class="page-description">{{ viewDescription }}</p>
      </div>
      <BaseButton @click="showForm = !showForm">{{ showForm ? 'Cerrar' : 'Nueva actividad' }}</BaseButton>
    </header>

    <BaseCard v-if="showForm" class="stack">
      <h2>{{ editingActivity ? 'Editar actividad' : 'Crear actividad' }}</h2>
      <ActivityForm
        :activity="editingActivity"
        :categories="categoryStore.categories"
        :locked-type="lockedType"
        @save="saveActivity"
        @cancel="editingActivity = null; showForm = false"
      />
    </BaseCard>

    <BaseCard class="stack">
      <ActivityFilters
        :model-value="filters"
        :categories="categoryStore.categories"
        :locked-type="lockedType"
        @update:model-value="updateFilters"
      />

      <ActivityList
        :activities="filteredActivities"
        :categories="categoryStore.categories"
        @toggle-completed="activityStore.toggleCompleted"
        @toggle-routine-item="activityStore.toggleRoutineItem($event.activityId, $event.itemId)"
        @edit="editActivity"
        @delete="activityStore.deleteActivity"
      />
    </BaseCard>
  </section>
</template>
