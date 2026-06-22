<script setup>
import BaseButton from '../base/BaseButton.vue'

defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="category-list">
    <article v-for="category in categories" :key="category.id" class="category-row">
      <div class="category-row__info">
        <span class="category-dot" :style="{ backgroundColor: category.color }" />
        <strong>{{ category.name }}</strong>
      </div>
      <div class="category-row__actions">
        <BaseButton variant="secondary" @click="$emit('edit', category)">Editar</BaseButton>
        <BaseButton
          variant="danger"
          :disabled="category.name === 'Otro'"
          @click="$emit('delete', category.id)"
        >
          Eliminar
        </BaseButton>
      </div>
    </article>
  </div>
</template>
