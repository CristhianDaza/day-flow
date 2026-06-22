<script setup>
defineProps({
  id: String,
  label: String,
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text',
  },
  required: Boolean,
  placeholder: String,
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label class="field" :for="id">
    <span>{{ label }}</span>
    <input
      :id="id"
      class="input"
      :type="type"
      :value="modelValue"
      :required="required"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>
