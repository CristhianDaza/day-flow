<script setup>
import { ref } from 'vue'
import BaseCard from '../components/base/BaseCard.vue'
import CategoryForm from '../components/categories/CategoryForm.vue'
import CategoryList from '../components/categories/CategoryList.vue'
import { useCategoryStore } from '../stores/categoryStore'

const categoryStore = useCategoryStore()
const editingCategory = ref(null)

function saveCategory(payload) {
  if (editingCategory.value) {
    categoryStore.updateCategory(editingCategory.value.id, payload)
    editingCategory.value = null
  } else {
    categoryStore.createCategory(payload)
  }
}
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Clasificacion flexible</p>
        <h1>Categorias</h1>
        <p class="page-description">Personaliza los grupos que usas para organizar tus actividades.</p>
      </div>
    </header>

    <div class="content-grid">
      <BaseCard class="stack">
        <h2>{{ editingCategory ? 'Editar categoria' : 'Nueva categoria' }}</h2>
        <CategoryForm
          :category="editingCategory"
          @save="saveCategory"
          @cancel="editingCategory = null"
        />
      </BaseCard>

      <BaseCard class="stack">
        <h2>Categorias disponibles</h2>
        <CategoryList
          :categories="categoryStore.categories"
          @edit="editingCategory = $event"
          @delete="categoryStore.deleteCategory"
        />
      </BaseCard>
    </div>
  </section>
</template>
