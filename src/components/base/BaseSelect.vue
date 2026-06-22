<script setup>
defineProps({
  id: String,
  label: String,
  modelValue: String,
  options: {
    type: Array,
    default: () => [],
  },
  required: Boolean,
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label class="field" :for="id">
    <span>{{ label }}</span>
    <select
      :id="id"
      class="input"
      :value="modelValue"
      :required="required"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>
