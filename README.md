# DayFlow

DayFlow es una aplicacion web modular para organizar actividades personales del dia a dia: tareas, habitos, recordatorios, rutinas, categorias y registros diarios.

La primera version esta pensada como una base funcional, limpia y escalable. Guarda la informacion en `localStorage`, pero la arquitectura separa la persistencia en servicios para facilitar una migracion futura a Firebase Firestore.

## Stack

- Vue 3
- Vite
- Composition API
- Vue Router
- Pinia
- CSS puro
- localStorage
- pnpm

No usa Tailwind ni librerias UI externas.

## Funcionalidades

- Dashboard con resumen del dia.
- Crear, editar, eliminar y completar actividades.
- Tipos de actividad: tarea, habito, recordatorio y rutina.
- Filtros por fecha, categoria, tipo y estado.
- Categorias personalizables.
- Rutinas con actividades internas marcables.
- Registro diario por fecha.
- Persistencia local al recargar el navegador.
- Interfaz responsive en modo oscuro con tonos azules.

## Instalacion

```bash
cd D:\DEV\work\dayflow
pnpm.cmd install
```

En algunos entornos Windows, `pnpm` puede estar bloqueado por la politica de ejecucion de PowerShell. En ese caso usa `pnpm.cmd`.

## Ejecutar en desarrollo

```bash
pnpm.cmd dev
```

Luego abre:

```txt
http://localhost:5173
```

## Build de produccion

```bash
pnpm.cmd build
```

## Preview del build

```bash
pnpm.cmd preview
```

## Estructura del proyecto

```txt
src/
  main.js
  App.vue

  assets/
    styles/
      base.css
      components.css
      index.css
      layout.css
      variables.css

  components/
    activities/
    base/
    categories/
    daily-log/
    dashboard/
    navigation/

  constants/
    activityTypes.js
    categories.js

  layouts/
    AppLayout.vue

  router/
    index.js

  services/
    activityService.js
    categoryService.js
    dailyLogService.js
    storageService.js

  stores/
    activityStore.js
    categoryStore.js
    dailyLogStore.js

  utils/
    dates.js
    filters.js
    ids.js

  views/
    ActivitiesView.vue
    CategoriesView.vue
    DailyLogView.vue
    DashboardView.vue
    HabitsView.vue
    RemindersView.vue
    RoutinesView.vue
    TasksView.vue
```

## Arquitectura

La app esta separada por responsabilidades:

- `views/`: paginas principales conectadas al router.
- `components/`: componentes reutilizables de UI y dominio.
- `stores/`: estado global con Pinia.
- `services/`: capa de persistencia.
- `utils/`: funciones puras para fechas, ids y filtros.
- `constants/`: opciones y valores base de dominio.
- `assets/styles/`: estilos globales en CSS puro.

`App.vue` se mantiene intencionalmente liviano y solo renderiza el router. El layout principal vive en `layouts/AppLayout.vue`.

## Modelo de datos

### Actividad

```js
{
  id: string,
  title: string,
  description: string,
  type: "task" | "habit" | "reminder" | "routine",
  category: string,
  priority: "low" | "medium" | "high",
  date: string,
  time: string,
  repeat: "none" | "daily" | "weekly" | "monthly" | "custom",
  completed: boolean,
  routineItems: [
    {
      id: string,
      title: string,
      completed: boolean
    }
  ],
  createdAt: string,
  updatedAt: string
}
```

### Categoria

```js
{
  id: string,
  name: string,
  color: string,
  createdAt: string,
  updatedAt: string
}
```

### Registro diario

```js
{
  id: string,
  date: string,
  content: string,
  createdAt: string,
  updatedAt: string
}
```

## Persistencia local

La informacion se guarda en `localStorage` con estas claves:

```txt
dayflow.activities
dayflow.categories
dayflow.dailyLogs
```

Los servicios actuales son:

- `activityService`
- `categoryService`
- `dailyLogService`
- `storageService`

Esta separacion permite cambiar la implementacion interna de persistencia sin reescribir las vistas ni los componentes.

## Categorias iniciales

DayFlow crea estas categorias al primer uso:

- Salud
- Estudio
- Familia
- Mascotas o plantas
- Trabajo
- Ocio
- Otro

Si se elimina una categoria usada por actividades existentes, esas actividades se reasignan a `Otro`.

## Modulos

### Dashboard

Muestra:

- Total de actividades del dia.
- Actividades pendientes.
- Actividades completadas.
- Porcentaje de progreso.
- Proximos recordatorios.

### Actividades

Vista principal para administrar cualquier tipo de actividad:

- Crear.
- Editar.
- Eliminar.
- Marcar como completada.
- Filtrar por fecha, categoria, tipo y estado.

### Habitos

Vista enfocada en actividades con `type: "habit"`.

### Tareas

Vista enfocada en actividades con `type: "task"`.

### Recordatorios

Vista enfocada en actividades con `type: "reminder"`. El estado vencido se calcula visualmente segun fecha y hora.

### Rutinas

Vista enfocada en actividades con `type: "routine"`. Una rutina puede incluir varias actividades internas, una por linea en el formulario.

### Categorias

Permite crear, editar y eliminar categorias personalizadas.

### Registro diario

Permite guardar notas asociadas a una fecha.

## Reglas de negocio

- `title`, `type`, `category` y `date` son obligatorios para crear una actividad.
- `time` es opcional, aunque se recomienda para recordatorios.
- Las repeticiones se guardan como dato, pero no generan ocurrencias automaticas en esta version.
- Las rutinas se completan automaticamente cuando todos sus items internos estan completados.
- Los filtros pueden combinarse entre si.
- El Dashboard calcula el progreso segun actividades de la fecha actual.

## Migracion futura a Firebase

La estructura sugerida para Firestore es:

```txt
users/{userId}/activities/{activityId}
users/{userId}/categories/{categoryId}
users/{userId}/dailyLogs/{dailyLogId}
```

Para migrar:

1. Agregar Firebase SDK.
2. Crear configuracion Firebase en `src/services/firebaseClient.js`.
3. Reemplazar la implementacion interna de los servicios actuales por operaciones Firestore.
4. Mantener los stores y componentes con la misma interfaz publica.
5. Agregar Firebase Auth cuando la app necesite usuarios reales y sincronizacion multi-dispositivo.

## Scripts disponibles

```bash
pnpm.cmd dev
pnpm.cmd build
pnpm.cmd preview
```

## Verificacion manual recomendada

Despues de levantar la app:

1. Crear una actividad tipo tarea.
2. Crear una actividad tipo habito.
3. Crear un recordatorio con fecha y hora.
4. Crear una rutina con varias lineas.
5. Marcar actividades como completadas.
6. Editar y eliminar una actividad.
7. Filtrar por fecha, categoria, tipo y estado.
8. Crear una categoria nueva.
9. Editar o eliminar una categoria.
10. Guardar una nota en el registro diario.
11. Recargar el navegador y confirmar que los datos persisten.

## Estado actual

DayFlow es una primera version local, funcional y monousuario. Esta lista para evolucionar hacia autenticacion, sincronizacion remota, notificaciones reales y generacion automatica de recurrencias.
