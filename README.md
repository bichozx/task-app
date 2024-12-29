# Task Application

Esta es una aplicación de gestión de tareas, construida con React y utilizando una API backend para manejar tareas. La aplicación permite crear, editar, eliminar, y cambiar el estado de las tareas (completadas o pendientes). También permite filtrar tareas según su estado.

## Tecnologías utilizadas

- **Frontend**: React.js, Tailwind CSS
- **Backend**: API RESTful (utilizando Axios para las solicitudes HTTP)
- **Estado global**: Context API de React
-

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de directorios:

src/ ├── components/ # Componentes reutilizables de la interfaz de usuario │ ├── TaskForm.js # Formulario para agregar nuevas tareas │ ├── TaskList.js # Lista de tareas │ ├── TaskItem.js # Elemento individual de una tarea │ ├── FilterTasks.js # Filtro de tareas (completadas, pendientes, todas) ├── context/ # Contexto para el manejo de las tareas │ ├── TaskContext.js # Contexto para tareas ├── services/ # Servicios para la comunicación con la API │ ├── createTask.js # Crear una nueva tarea │ ├── deleteTask.js # Eliminar una tarea │ ├── getTask/getAllTasks.js # Obtener todas las tareas │ ├── getTask/getTaskById.js # Obtener una tarea por ID │ ├── updateTask.js # Actualizar una tarea ├── App.js # Componente principal de la aplicación ├── index.js # Entrada de la aplicación └── conf/ └── conf.js # Configuración general (como la URL de la API)

Para comenzar a trabajar en el proyecto, sigue los siguientes pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/bichozx/task-app.git

   ```

2. cd task-app

3. npm install

4. npm start

Funcionalidades
Crear una tarea
El formulario en TaskForm.js permite a los usuarios crear nuevas tareas. La tarea se envía al backend a través de la función createTask, y la lista de tareas se actualiza automáticamente sin necesidad de recargar la página.

Ver todas las tareas
En el componente TaskList.js, se muestran todas las tareas que se obtienen desde el backend utilizando getAllTasks. Puedes filtrar las tareas según su estado (completada, pendiente o todas).

Editar una tarea
Cada tarea tiene un botón de "editar". Al hacer clic en él, se habilita un formulario donde puedes cambiar el título y la descripción de la tarea. Los cambios se envían al backend a través de la función updateTask.

Eliminar una tarea
Cada tarea tiene un botón de "eliminar" que elimina la tarea utilizando la función deleteTask.

Filtrar tareas
El componente FilterTasks.js permite filtrar las tareas según su estado (completadas, pendientes o todas). El estado seleccionado se gestiona a través de un useState en TaskList.js.
