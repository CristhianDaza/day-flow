<script setup>
import { computed, ref } from 'vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseButton from '../components/base/BaseButton.vue'
import ActivityForm from '../components/activities/ActivityForm.vue'
import TodayOverview from '../components/dashboard/TodayOverview.vue'
import SummaryCard from '../components/dashboard/SummaryCard.vue'
import ProgressRing from '../components/dashboard/ProgressRing.vue'
import { useActivityStore } from '../stores/activityStore'
import { useCategoryStore } from '../stores/categoryStore'
import { getTodayDate, formatDisplayDate, isBeforeNow } from '../utils/dates'

const activityStore = useActivityStore()
const categoryStore = useCategoryStore()
const showForm = ref(false)
const editingActivity = ref(null)
const today = getTodayDate()

const stats = computed(() => activityStore.getStatsForDate(today))
const todayActivities = computed(() => activityStore.todayActivities)
const pendingActivities = computed(() => todayActivities.value.filter((activity) => !activity.completed))
const completedActivities = computed(() => todayActivities.value.filter((activity) => activity.completed))
const upcomingReminders = computed(() =>
  activityStore.activities
    .filter((activity) => activity.type === 'reminder' && !activity.completed && !isBeforeNow(activity.date, activity.time))
    .slice(0, 4),
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
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">{{ formatDisplayDate(today) }}</p>
        <h1>Dashboard</h1>
        <p class="page-description">Tu panorama diario de actividades, pendientes y avance.</p>
      </div>
      <BaseButton @click="showForm = !showForm">{{ showForm ? 'Cerrar' : 'Nueva actividad' }}</BaseButton>
    </header>

    <BaseCard v-if="showForm" class="stack">
      <h2>{{ editingActivity ? 'Editar actividad' : 'Crear actividad' }}</h2>
      <ActivityForm
        :activity="editingActivity"
        :categories="categoryStore.categories"
        @save="saveActivity"
        @cancel="editingActivity = null; showForm = false"
      />
    </BaseCard>

    <div class="dashboard-grid">
      <SummaryCard
        label="Plan del dia"
        :value="stats.total"
        :detail="stats.total === 1 ? 'actividad' : 'actividades'"
        icon="plan"
      />
      <SummaryCard
        label="Por resolver"
        :value="stats.pending"
        :detail="stats.pending === 1 ? 'pendiente' : 'pendientes'"
        tone="cyan"
        icon="pending"
      />
      <SummaryCard
        label="Cerradas"
        :value="stats.completed"
        :detail="stats.completed === 1 ? 'completada' : 'completadas'"
        tone="green"
        icon="done"
      />
      <ProgressRing :value="stats.progress" />
    </div>

    <div class="content-grid">
      <BaseCard class="stack">
        <div class="section-heading">
          <div>
            <h2>Actividades de hoy</h2>
            <p class="muted">{{ pendingActivities.length }} pendientes, {{ completedActivities.length }} completadas.</p>
          </div>
        </div>
        <TodayOverview
          :activities="todayActivities"
          :categories="categoryStore.categories"
          @toggle-completed="activityStore.toggleCompleted"
          @toggle-routine-item="activityStore.toggleRoutineItem($event.activityId, $event.itemId)"
          @edit="editActivity"
          @delete="activityStore.deleteActivity"
        />
      </BaseCard>

      <BaseCard class="stack">
        <h2>Proximos recordatorios</h2>
        <div v-if="upcomingReminders.length" class="mini-list">
          <article v-for="reminder in upcomingReminders" :key="reminder.id">
            <strong>{{ reminder.title }}</strong>
            <span>{{ formatDisplayDate(reminder.date) }} {{ reminder.time }}</span>
          </article>
        </div>
        <p v-else class="muted">No hay recordatorios pendientes proximos.</p>
      </BaseCard>
    </div>
  </section>
</template>
