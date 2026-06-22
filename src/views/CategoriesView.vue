<script setup>
import { computed, ref } from 'vue'
import BaseCard from '../components/base/BaseCard.vue'
import CategoryForm from '../components/categories/CategoryForm.vue'
import CategoryList from '../components/categories/CategoryList.vue'
import SummaryCard from '../components/dashboard/SummaryCard.vue'
import { useActivityStore } from '../stores/activityStore'
import { useCategoryStore } from '../stores/categoryStore'

const categoryStore = useCategoryStore()
const activityStore = useActivityStore()
const editingCategory = ref(null)

const usedCategories = computed(
  () => new Set(activityStore.activities.map((activity) => activity.category)).size,
)
const unclassifiedActivities = computed(
  () => activityStore.activities.filter((activity) => activity.category === 'Otro').length,
)

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

    <div class="metric-grid">
      <SummaryCard
        label="Categorias"
        :value="categoryStore.categories.length"
        detail="disponibles"
        icon="category"
      />
      <SummaryCard
        label="En uso"
        :value="usedCategories"
        detail="con actividad"
        tone="cyan"
        icon="filter"
      />
      <SummaryCard
        label="Otro"
        :value="unclassifiedActivities"
        detail="sin clasificar"
        tone="green"
        icon="plan"
      />
    </div>

    <div class="content-grid">
      <BaseCard class="stack">
        <div>
          <h2>{{ editingCategory ? 'Editar categoria' : 'Nueva categoria' }}</h2>
          <p class="muted">Define grupos claros para que los filtros tengan sentido.</p>
        </div>
        <CategoryForm
          :category="editingCategory"
          @save="saveCategory"
          @cancel="editingCategory = null"
        />
      </BaseCard>

      <BaseCard class="stack">
        <div>
          <h2>Categorias disponibles</h2>
          <p class="muted">Edita nombres y colores sin perder las actividades asociadas.</p>
        </div>
        <CategoryList
          :categories="categoryStore.categories"
          @edit="editingCategory = $event"
          @delete="categoryStore.deleteCategory"
        />
      </BaseCard>
    </div>
  </section>
</template>
