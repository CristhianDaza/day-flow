<script setup>
import { ref, watch } from 'vue'
import BaseButton from '../base/BaseButton.vue'
import BaseTextarea from '../base/BaseTextarea.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['save'])
const content = ref(props.modelValue)

watch(
  () => props.modelValue,
  (value) => {
    content.value = value
  },
)
</script>

<template>
  <div class="daily-log-editor">
    <BaseTextarea
      id="daily-log"
      v-model="content"
      label="Notas del dia"
      :rows="12"
      placeholder="Escribe que hiciste, ideas rapidas, pendientes o reflexiones."
    />
    <BaseButton @click="$emit('save', content)">Guardar registro</BaseButton>
  </div>
</template>
