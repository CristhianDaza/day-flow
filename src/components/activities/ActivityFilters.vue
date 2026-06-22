<script setup>
import BaseButton from '../base/BaseButton.vue'
import BaseInput from '../base/BaseInput.vue'
import BaseSelect from '../base/BaseSelect.vue'
import { ACTIVITY_TYPES } from '../../constants/activityTypes'

defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    default: () => [],
  },
  lockedType: String,
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="filters">
    <BaseInput
      id="filter-date"
      label="Fecha"
      type="date"
      :model-value="modelValue.date"
      @update:model-value="$emit('update:modelValue', { ...modelValue, date: $event })"
    />
    <BaseSelect
      id="filter-category"
      label="Categoria"
      :model-value="modelValue.category"
      :options="[{ value: '', label: 'Todas' }, ...categories.map((category) => ({ value: category.name, label: category.name }))]"
      @update:model-value="$emit('update:modelValue', { ...modelValue, category: $event })"
    />
    <BaseSelect
      v-if="!lockedType"
      id="filter-type"
      label="Tipo"
      :model-value="modelValue.type"
      :options="[{ value: '', label: 'Todos' }, ...ACTIVITY_TYPES]"
      @update:model-value="$emit('update:modelValue', { ...modelValue, type: $event })"
    />
    <BaseSelect
      id="filter-status"
      label="Estado"
      :model-value="modelValue.status"
      :options="[
        { value: '', label: 'Todos' },
        { value: 'pending', label: 'Pendientes' },
        { value: 'completed', label: 'Completadas' },
      ]"
      @update:model-value="$emit('update:modelValue', { ...modelValue, status: $event })"
    />
    <BaseButton
      variant="ghost"
      @click="$emit('update:modelValue', { date: modelValue.date, category: '', type: lockedType || '', status: '' })"
    >
      Limpiar
    </BaseButton>
  </div>
</template>
