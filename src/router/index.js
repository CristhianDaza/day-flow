import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
import DashboardView from '../views/DashboardView.vue'
import ActivitiesView from '../views/ActivitiesView.vue'
import HabitsView from '../views/HabitsView.vue'
import TasksView from '../views/TasksView.vue'
import RemindersView from '../views/RemindersView.vue'
import RoutinesView from '../views/RoutinesView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import DailyLogView from '../views/DailyLogView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        { path: '', name: 'dashboard', component: DashboardView },
        { path: 'activities', name: 'activities', component: ActivitiesView },
        { path: 'habits', name: 'habits', component: HabitsView },
        { path: 'tasks', name: 'tasks', component: TasksView },
        { path: 'reminders', name: 'reminders', component: RemindersView },
        { path: 'routines', name: 'routines', component: RoutinesView },
        { path: 'categories', name: 'categories', component: CategoriesView },
        { path: 'daily-log', name: 'daily-log', component: DailyLogView },
      ],
    },
  ],
})

export default router
