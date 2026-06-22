<script setup>
import { computed, ref } from 'vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseInput from '../components/base/BaseInput.vue'
import DailyLogEditor from '../components/daily-log/DailyLogEditor.vue'
import SummaryCard from '../components/dashboard/SummaryCard.vue'
import { useDailyLogStore } from '../stores/dailyLogStore'
import { getTodayDate, formatDisplayDate } from '../utils/dates'

const dailyLogStore = useDailyLogStore()
const selectedDate = ref(getTodayDate())
const savedMessage = ref('')

const currentLog = computed(() => dailyLogStore.getLogByDate(selectedDate.value))
const wordCount = computed(() => {
  const content = currentLog.value?.content?.trim()
  return content ? content.split(/\s+/).length : 0
})
const selectedStatus = computed(() => (currentLog.value?.content?.trim() ? 'Listo' : 'Vacio'))

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

    <div class="metric-grid">
      <SummaryCard
        label="Archivo"
        :value="dailyLogStore.logs.length"
        :detail="dailyLogStore.logs.length === 1 ? 'registro' : 'registros'"
        icon="log"
      />
      <SummaryCard
        label="Dia seleccionado"
        :value="selectedStatus"
        detail="estado"
        tone="cyan"
        icon="calendar"
      />
      <SummaryCard
        label="Texto"
        :value="wordCount"
        :detail="wordCount === 1 ? 'palabra' : 'palabras'"
        tone="green"
        icon="filter"
      />
    </div>

    <div class="content-grid">
      <BaseCard class="stack">
        <div>
          <h2>Entrada del dia</h2>
          <p class="muted">Un espacio breve para registrar lo importante sin convertirlo en otra tarea pesada.</p>
        </div>
        <BaseInput id="daily-date" v-model="selectedDate" label="Fecha" type="date" />
        <DailyLogEditor :model-value="currentLog?.content || ''" @save="saveLog" />
        <p v-if="savedMessage" class="save-message">{{ savedMessage }}</p>
      </BaseCard>

      <BaseCard class="stack">
        <h2>Contexto</h2>
        <div class="insight-list">
          <article>
            <span class="insight-dot" />
            <p>Fecha activa: {{ formatDisplayDate(selectedDate) }}</p>
          </article>
          <article>
            <span class="insight-dot insight-dot--cyan" />
            <p>{{ currentLog ? 'Ya existe una nota para este dia.' : 'Todavia no hay nota guardada para este dia.' }}</p>
          </article>
          <article>
            <span class="insight-dot insight-dot--green" />
            <p>Los registros quedan guardados localmente en este navegador.</p>
          </article>
        </div>
      </BaseCard>
    </div>
  </section>
</template>
