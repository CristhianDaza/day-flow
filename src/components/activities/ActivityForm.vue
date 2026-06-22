<script setup>
import { computed, reactive, watch } from 'vue'
import BaseButton from '../base/BaseButton.vue'
import BaseInput from '../base/BaseInput.vue'
import BaseSelect from '../base/BaseSelect.vue'
import BaseTextarea from '../base/BaseTextarea.vue'
import { ACTIVITY_TYPES, PRIORITIES, REPEAT_OPTIONS } from '../../constants/activityTypes'
import { getTodayDate } from '../../utils/dates'
import { createId } from '../../utils/ids'

const props = defineProps({
  activity: Object,
  categories: {
    type: Array,
    default: () => [],
  },
  lockedType: String,
})

const emit = defineEmits(['save', 'cancel'])

const form = reactive({
  title: '',
  description: '',
  type: props.lockedType || 'task',
  category: '',
  priority: 'medium',
  date: getTodayDate(),
  time: '',
  repeat: 'none',
  completed: false,
  routineItemsText: '',
})

const isEditing = computed(() => Boolean(props.activity?.id))
const categoryOptions = computed(() =>
  props.categories.map((category) => ({ value: category.name, label: category.name })),
)

function fillForm(activity) {
  form.title = activity?.title || ''
  form.description = activity?.description || ''
  form.type = props.lockedType || activity?.type || 'task'
  form.category = activity?.category || props.categories[0]?.name || 'Otro'
  form.priority = activity?.priority || 'medium'
  form.date = activity?.date || getTodayDate()
  form.time = activity?.time || ''
  form.repeat = activity?.repeat || 'none'
  form.completed = Boolean(activity?.completed)
  form.routineItemsText = activity?.routineItems?.map((item) => item.title).join('\n') || ''
}

function buildRoutineItems() {
  if (form.type !== 'routine') return []

  const existingItems = props.activity?.routineItems || []
  return form.routineItemsText
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((title, index) => ({
      id: existingItems[index]?.id || createId('routine-item'),
      title,
      completed: existingItems[index]?.title === title ? Boolean(existingItems[index]?.completed) : false,
    }))
}

function submitForm() {
  emit('save', {
    title: form.title,
    description: form.description,
    type: form.type,
    category: form.category,
    priority: form.priority,
    date: form.date,
    time: form.time,
    repeat: form.repeat,
    completed: form.completed,
    routineItems: buildRoutineItems(),
  })

  if (!isEditing.value) {
    fillForm(null)
  }
}

watch(
  () => [props.activity, props.lockedType, props.categories.length],
  () => fillForm(props.activity),
  { immediate: true },
)
</script>

<template>
  <form class="activity-form" @submit.prevent="submitForm">
    <div class="form-grid">
      <BaseInput id="activity-title" v-model="form.title" label="Titulo" required placeholder="Ej. Estudiar 45 minutos" />
      <BaseSelect
        v-if="!lockedType"
        id="activity-type"
        v-model="form.type"
        label="Tipo"
        :options="ACTIVITY_TYPES"
        required
      />
      <BaseSelect id="activity-category" v-model="form.category" label="Categoria" :options="categoryOptions" required />
      <BaseSelect id="activity-priority" v-model="form.priority" label="Prioridad" :options="PRIORITIES" />
      <BaseInput id="activity-date" v-model="form.date" label="Fecha" type="date" required />
      <BaseInput
        id="activity-time"
        v-model="form.time"
        label="Hora"
        type="time"
        :placeholder="form.type === 'reminder' ? 'Recomendada' : 'Opcional'"
      />
      <BaseSelect id="activity-repeat" v-model="form.repeat" label="Repeticion" :options="REPEAT_OPTIONS" />
    </div>

    <BaseTextarea
      id="activity-description"
      v-model="form.description"
      label="Descripcion"
      :rows="3"
      placeholder="Detalles utiles para recordar el contexto."
    />

    <BaseTextarea
      v-if="form.type === 'routine'"
      id="routine-items"
      v-model="form.routineItemsText"
      label="Actividades de la rutina"
      :rows="4"
      placeholder="Una actividad por linea"
    />

    <div class="form-actions">
      <BaseButton type="submit">{{ isEditing ? 'Guardar cambios' : 'Crear actividad' }}</BaseButton>
      <BaseButton v-if="isEditing" variant="ghost" @click="$emit('cancel')">Cancelar</BaseButton>
    </div>
  </form>
</template>
