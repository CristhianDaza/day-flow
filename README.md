# DayFlow

DayFlow es una aplicacion web para organizar el dia a dia mediante actividades, tareas, habitos, recordatorios, rutinas, categorias y registros diarios.

La app esta construida con Vue 3, Vite, Vue Router, Pinia y CSS puro. Los datos se guardan localmente en el navegador mediante `localStorage`.

## Desarrollo

### Requisitos

- Node.js instalado.
- pnpm instalado.

En Windows, si PowerShell bloquea `pnpm`, usa `pnpm.cmd`.

### Instalacion

```bash
cd D:\DEV\work\dayflow
pnpm.cmd install
```

### Levantar el entorno local

```bash
pnpm.cmd dev
```

La app queda disponible en:

```txt
http://localhost:5173
```

### Generar build

```bash
pnpm.cmd build
```

### Previsualizar build

```bash
pnpm.cmd preview
```

### Scripts

```txt
dev      Levanta Vite en modo desarrollo.
build    Genera el build de produccion.
preview  Sirve localmente el build generado.
```

### Stack

- Vue 3
- Vite
- Composition API
- Vue Router
- Pinia
- CSS puro
- localStorage

### Estructura principal

```txt
src/
  main.js
  App.vue
  router/
  stores/
  services/
  constants/
  utils/
  layouts/
  components/
  views/
  assets/styles/
```

Responsabilidades:

- `router/`: rutas de la aplicacion.
- `stores/`: estado global con Pinia.
- `services/`: lectura y escritura en `localStorage`.
- `components/`: componentes reutilizables.
- `views/`: paginas principales.
- `assets/styles/`: estilos globales.

### Persistencia

DayFlow guarda informacion en `localStorage` usando estas claves:

```txt
dayflow.activities
dayflow.categories
dayflow.dailyLogs
```

Los servicios que administran esa persistencia estan en:

```txt
src/services/activityService.js
src/services/categoryService.js
src/services/dailyLogService.js
src/services/storageService.js
```

## Uso de la app

### Navegacion general

La navegacion principal esta en el sidebar en escritorio y en la barra inferior en movil.

Secciones disponibles:

- Dashboard
- Actividades
- Habitos
- Tareas
- Recordatorios
- Rutinas
- Categorias
- Registro diario

### Dashboard

El Dashboard muestra el estado del dia actual:

- Plan del dia.
- Actividades por resolver.
- Actividades cerradas.
- Avance general.
- Actividades de hoy.
- Proximos recordatorios.

Desde el Dashboard tambien se puede crear una nueva actividad.

### Crear una actividad

Para crear una actividad:

1. Entrar a `Dashboard` o `Actividades`.
2. Presionar `Nueva actividad`.
3. Completar el formulario.
4. Guardar.

Campos principales:

- `Titulo`: nombre de la actividad.
- `Descripcion`: detalle opcional.
- `Tipo`: tarea, habito, recordatorio o rutina.
- `Categoria`: grupo al que pertenece.
- `Prioridad`: baja, media o alta.
- `Fecha`: dia asociado.
- `Hora`: horario opcional.
- `Repeticion`: sin repeticion, diaria, semanal, mensual o personalizada.

### Editar una actividad

Para editar:

1. Buscar la actividad en la lista.
2. Presionar `Editar`.
3. Modificar los campos necesarios.
4. Guardar los cambios.

### Eliminar una actividad

Para eliminar:

1. Buscar la actividad.
2. Presionar `Eliminar`.

La actividad se elimina de la lista y de `localStorage`.

### Completar una actividad

Cada actividad tiene una accion para marcarla como completada.

Cuando una actividad esta completada:

- Aparece con estado `Completada`.
- Cuenta dentro del avance del dia si pertenece a la fecha actual.
- Puede volver a abrirse con la accion `Reabrir`.

### Filtrar actividades

En la vista `Actividades` y en las vistas por tipo se pueden usar filtros.

Filtros disponibles:

- Fecha.
- Categoria.
- Tipo.
- Estado.

Los filtros pueden combinarse. Por ejemplo: ver solo tareas pendientes de una categoria especifica para una fecha concreta.

### Habitos

La vista `Habitos` muestra actividades de tipo `habit`.

Sirve para seguimientos repetibles como:

- Estudiar.
- Hacer ejercicio.
- Leer.
- Meditar.
- Cualquier habito personalizado.

### Tareas

La vista `Tareas` muestra actividades de tipo `task`.

Sirve para pendientes concretos con prioridad y fecha.

### Recordatorios

La vista `Recordatorios` muestra actividades de tipo `reminder`.

Si un recordatorio tiene fecha y hora anteriores al momento actual y no esta completado, se muestra como vencido visualmente.

### Rutinas

La vista `Rutinas` muestra actividades de tipo `routine`.

Al crear una rutina se pueden escribir varias actividades internas, una por linea.

Ejemplo:

```txt
Tomar agua
Organizar escritorio
Leer 20 minutos
Planear el dia
```

Cada item interno puede marcarse como completado. Cuando todos los items estan completados, la rutina queda completada.

### Categorias

La vista `Categorias` permite administrar los grupos usados para clasificar actividades.

Categorias iniciales:

- Salud
- Estudio
- Familia
- Mascotas o plantas
- Trabajo
- Ocio
- Otro

Acciones disponibles:

- Crear categoria.
- Editar categoria.
- Eliminar categoria.

Si se elimina una categoria que esta siendo usada, sus actividades pasan a la categoria `Otro`.

### Registro diario

La vista `Registro diario` permite escribir notas asociadas a una fecha.

Para usarlo:

1. Seleccionar una fecha.
2. Escribir el registro del dia.
3. Presionar `Guardar registro`.

El registro queda guardado en el navegador y puede consultarse nuevamente seleccionando la misma fecha.

### Datos locales

Toda la informacion se guarda en el navegador actual.

Si se borra el almacenamiento del navegador, tambien se borran los datos de DayFlow.
