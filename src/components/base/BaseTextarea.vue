<script setup>
defineProps({
  id: String,
  label: String,
  modelValue: String,
  rows: {
    type: Number,
    default: 4,
  },
  placeholder: String,
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label class="field" :for="id">
    <span>{{ label }}</span>
    <textarea
      :id="id"
      class="input textarea"
      :rows="rows"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>
