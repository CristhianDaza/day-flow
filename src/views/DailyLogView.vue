<script setup>
import { computed, ref } from 'vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseInput from '../components/base/BaseInput.vue'
import DailyLogEditor from '../components/daily-log/DailyLogEditor.vue'
import { useDailyLogStore } from '../stores/dailyLogStore'
import { getTodayDate, formatDisplayDate } from '../utils/dates'

const dailyLogStore = useDailyLogStore()
const selectedDate = ref(getTodayDate())
const savedMessage = ref('')

const currentLog = computed(() => dailyLogStore.getLogByDate(selectedDate.value))

function saveLog(content) {
  dailyLogStore.saveLog(selectedDate.value, content)
  savedMessage.value = 'Registro guardado'
  window.setTimeout(() => {
    savedMessage.value = ''
  }, 1800)
}
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">{{ formatDisplayDate(selectedDate) }}</p>
        <h1>Registro diario</h1>
        <p class="page-description">Guarda notas rapidas sobre lo que hiciste durante el dia.</p>
      </div>
    </header>

    <BaseCard class="stack">
      <BaseInput id="daily-date" v-model="selectedDate" label="Fecha" type="date" />
      <DailyLogEditor :model-value="currentLog?.content || ''" @save="saveLog" />
      <p v-if="savedMessage" class="save-message">{{ savedMessage }}</p>
    </BaseCard>
  </section>
</template>
