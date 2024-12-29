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

## Despliegue

El frontend de la aplicación está desplegado en [Netlify](https://tareasweb.netlify.app/). Puedes acceder a la aplicación a través de la siguiente URL:

- **Frontend (Netlify)**: [https://tareasweb.netlify.app/](https://tareasweb.netlify.app/)

## Instrucciones para ejecutar el proyecto

Para comenzar a trabajar en el proyecto, sigue los siguientes pasos:

1. Clona el repositorio:

   ```bash
    git clone https://github.com/bichozx/task-app.git

   ```

2. cd task-app

3. npm install

4. npm start

## Para trabajar en local

urlApi: 'http://localhost:8082/',
