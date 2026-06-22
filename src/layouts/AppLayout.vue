<script setup>
import SidebarNav from '../components/navigation/SidebarNav.vue'
import MobileNav from '../components/navigation/MobileNav.vue'
</script>

<template>
  <div class="app-shell">
    <SidebarNav />
    <main class="app-main">
      <RouterView />
    </main>
    <MobileNav />
  </div>
</template>
