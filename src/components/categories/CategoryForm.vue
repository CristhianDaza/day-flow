<script setup>
import { reactive, watch } from 'vue'
import BaseButton from '../base/BaseButton.vue'
import BaseInput from '../base/BaseInput.vue'

const props = defineProps({
  category: Object,
})

const emit = defineEmits(['save', 'cancel'])

const form = reactive({
  name: '',
  color: '#38bdf8',
})

watch(
  () => props.category,
  (category) => {
    form.name = category?.name || ''
    form.color = category?.color || '#38bdf8'
  },
  { immediate: true },
)

function submitForm() {
  emit('save', { name: form.name, color: form.color })
  if (!props.category) {
    form.name = ''
    form.color = '#38bdf8'
  }
}
</script>

<template>
  <form class="category-form" @submit.prevent="submitForm">
    <BaseInput id="category-name" v-model="form.name" label="Nombre" required placeholder="Ej. Finanzas" />
    <BaseInput id="category-color" v-model="form.color" label="Color" type="color" />
    <div class="form-actions">
      <BaseButton type="submit">{{ category ? 'Guardar' : 'Crear categoria' }}</BaseButton>
      <BaseButton v-if="category" variant="ghost" @click="$emit('cancel')">Cancelar</BaseButton>
    </div>
  </form>
</template>
